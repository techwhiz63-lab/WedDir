import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Loader2,
  X,
  Heart,
  Sparkles,
  Quote,
  CheckCircle2,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { useGreetings } from "@/hooks/use-greetings";

interface Greeting {
  name: string;
  message: string;
  timestamp?: string;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Format timestamp to human-readable format
const formatTimestamp = (timestamp?: string): string => {
  if (!timestamp) return "";
  try {
    const cleaned = timestamp.trim();
    const parts = cleaned.split(" ");
    if (parts.length < 2) return cleaned;

    const dateParts = parts[0]?.split("/") || [];
    const timeParts = parts[1]?.split(":") || [];
    if (dateParts.length < 3 || timeParts.length < 2) return cleaned;

    let monthNum = parseInt(dateParts[0] || "1", 10);
    let day = parseInt(dateParts[1] || "1", 10);
    const year = dateParts[2] || "";

    // Handle DD/MM/YYYY vs MM/DD/YYYY gracefully
    if (monthNum > 12 && day <= 12) {
      [monthNum, day] = [day, monthNum];
    }

    const month =
      monthNum >= 1 && monthNum <= 12 ? MONTHS[monthNum - 1] : MONTHS[0];
    const dayStr = String(day).padStart(2, "0");
    const hours = String(timeParts[0] || "00").padStart(2, "0");
    const minutes = String(timeParts[1] || "00").padStart(2, "0");

    return `${dayStr} ${month} ${year} • ${hours}:${minutes}`;
  } catch (err) {
    console.error("Timestamp format error:", timestamp, err);
    return timestamp;
  }
};

// Helper to get initials for avatar badge
const getInitials = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function GreetingSection() {
  const { greetings, loading, error, addGreeting } = useGreetings();
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Auto-close form safely after successful submission
  useEffect(() => {
    if (!submitSuccess) return;

    const timer = setTimeout(() => {
      setSubmitSuccess(false);
      setShowForm(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [submitSuccess]);

  const handleCloseForm = () => {
    setShowForm(false);
    setFormError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = formData.name.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedMessage) {
      setFormError("Please fill in both your name and blessing message.");
      return;
    }

    setFormLoading(true);
    try {
      await addGreeting(trimmedName, trimmedMessage);
      setSubmitSuccess(true);
      setFormData({ name: "", message: "" });
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to submit greeting";
      if (errorMsg.includes("Tools")) {
        setFormError(
          `${errorMsg}. Once you set up the form, configure the environment variables in .env.`
        );
      } else {
        setFormError("Failed to submit greeting. Please try again.");
      }
      console.error("Error submitting greeting:", err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
        <section
      id="greetings"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Full-Clarity Background Image */}
      <div
        className="pointer-events-none absolute inset-0"
        // style={{
        //   backgroundImage: `url('/engagement.jpg')`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
      />
      {/* Sharp, uncropped full photo */}
      <div
        className="pointer-events-none absolute inset-0 bg-no-repeat"
        style={{
         // backgroundImage: `url('/images/engagement-bg.jpg')`,
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />

      {/* Optional: Very subtle dark wash so the heading text stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      {/* Top & Bottom Soft Vignette Borders */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

      {/* Warm Marigold & Rose-Gold Ambient Glow Orbs */}
      <motion.div
        animate={{
          y: Array.of(0, -30, 0),
          x: Array.of(0, 20, 0),
          scale: Array.of(1, 1.08, 1),
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-28 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-amber-300/25 via-rose-300/20 to-transparent blur-3xl hidden md:block"
      />
      <motion.div
        animate={{
          y: Array.of(0, 25, 0),
          x: Array.of(0, -25, 0),
          scale: Array.of(1, 1.1, 1),
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 -right-28 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tl from-primary/15 via-amber-200/25 to-transparent blur-3xl hidden md:block"
      />
      <motion.div
        animate={{
          y: Array.of(0, -20, 0),
          scale: Array.of(1, 1.06, 1),
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-rose-200/25 blur-3xl hidden md:block"
      />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-left [&>*]:text-left [&>*]:items-start [&>*]:mx-0"
        >
           <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
            Blessings & Greetings
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-gray-600">
            Share your warm wishes for the couple
          </p>
          <div className="mt-3 h-1 w-14 rounded-full bg-primary" />
        </motion.div>

        {/* Greetings Grid */}
        {!loading && greetings.length > 0 && (
          <div className="max-w-5xl mx-auto mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {greetings.map((greeting: Greeting, index: number) => {
              const isExpanded = expandedIndex === index;
              const isLongMessage = greeting.message.length > 110;
              const toggleExpand = () =>
                setExpandedIndex(isExpanded ? null : index);

              return (
                <motion.div
                  key={`${greeting.name}-${greeting.timestamp ?? index}`}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.08, 0.4),
                    layout: { duration: 0.35, ease: "easeInOut" },
                  }}
                  whileHover={{ y: -6 }}
                  className={`group ${isExpanded ? "md:col-span-2" : ""}`}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    onClick={toggleExpand}
                    onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleExpand();
                      }
                    }}
                    className="relative h-full overflow-hidden rounded-3xl bg-white/85 backdrop-blur-md p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.09)] transition-all duration-300 border border-primary/15 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {/* Animated Top Gradient Accent Bar */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/40 via-primary to-secondary/60 opacity-75 group-hover:opacity-100 transition-opacity" />

                    {/* Decorative Quote Watermark */}
                    <Quote className="absolute -bottom-3 -right-3 h-24 w-24 text-primary/5 group-hover:text-primary/10 group-hover:scale-110 transition-all duration-500 rotate-12" />

                    {/* Header: Avatar + Name + Timestamp */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3.5">
                        <motion.div
                          whileHover={{ rotate: [0, -8, 8, 0] }}
                          transition={{ duration: 0.4 }}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-white font-bold text-sm shadow-md"
                        >
                          {getInitials(greeting.name) || "💝"}
                        </motion.div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">
                            {greeting.name}
                          </h3>
                          {greeting.timestamp && (
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                              {formatTimestamp(greeting.timestamp)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Floating Heart Badge */}
                      <motion.div
                        whileHover={{ scale: 1.25 }}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                      >
                        <Heart className="h-4 w-4" />
                      </motion.div>
                    </div>

                    {/* Message Content */}
                    <motion.div layout="position" className="relative z-10">
                      <p
                        className={`text-gray-600 leading-relaxed whitespace-pre-wrap transition-all duration-300 ${
                          isExpanded
                            ? "text-base text-gray-800"
                            : "text-sm line-clamp-3"
                        }`}
                      >
                        “{greeting.message}”
                      </p>

                      {isLongMessage && (
                        <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                          <span>
                            {isExpanded ? "Show less" : "Read full blessing"}
                          </span>
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ChevronDown className="h-3.5 w-3.5" />
                          </motion.span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
            <p className="text-sm">Gathering warm wishes...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && greetings.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-fit max-w-xs sm:max-w-sm mx-auto text-center py-4 px-5 mb-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-dashed border-primary/30"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2"
            >
              <Sparkles className="h-5 w-5" />
            </motion.div>
            <p className="text-gray-600 font-medium">
              No greetings yet. Be the first to share your blessings!
            </p>
          </motion.div>
        )}

        {/* Fetch Error State */}
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm text-center flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Add Greeting CTA / Interactive Form */}
        <motion.div layout className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="cta-button"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Button
                    onClick={() => setShowForm(true)}
                    size="lg"
                    className="relative overflow-hidden bg-primary hover:bg-primary/95 text-white px-9 py-6 rounded-full font-semibold text-base shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)] flex items-center gap-2.5 group"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    >
                      💝
                    </motion.span>
                    <span>Add Your Blessing</span>
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="greeting-form"
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="relative overflow-hidden bg-white/95 backdrop-blur-md rounded-3xl p-7 sm:p-9 shadow-2xl border border-primary/20"
              >
                {/* Decorative Top Gradient */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-amber-400 to-rose-400" />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Share Your Blessings
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Your message will be displayed on this wedding site
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={handleCloseForm}
                    className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Close form"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"
                    >
                      <CheckCircle2 className="h-9 w-9" />
                    </motion.div>
                    <h4 className="text-lg font-bold text-gray-800">
                    Thank You for Your Blessing! 💝
                    </h4>
                    <p className="text-sm text-gray-500">
                      Your warm wishes have been added to the celebration wall.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {formError && (
                      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label
                        htmlFor="greeting-name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Your Name
                      </label>
                      <Input
                        id="greeting-name"
                        type="text"
                        placeholder="e.g., Uncle Ravi & Family"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        disabled={formLoading}
                        maxLength={80}
                        className="rounded-xl border-primary/20 focus:border-primary bg-white/80 h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="greeting-message"
                        className="text-sm font-medium text-gray-700"
                      >
                        Your Wishes & Blessings
                      </label>
                      <Textarea
                        id="greeting-message"
                        placeholder="Write a heartfelt message for the couple..."
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          });
                          if (formError) setFormError(null);
                        }}
                        disabled={formLoading}
                        rows={4}
                        maxLength={600}
                        className="rounded-xl border-primary/20 focus:border-primary bg-white/80 resize-none"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleCloseForm}
                        disabled={formLoading}
                        className="rounded-xl"
                      >
                        Cancel
                      </Button>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          type="submit"
                          disabled={formLoading}
                          className="bg-primary hover:bg-primary/95 text-white rounded-xl px-6 flex items-center gap-2"
                        >
                          {formLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              <span>Send Blessing</span>
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}


// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { SectionHeading } from "@/components/SectionHeading";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Send, Loader2, X } from "lucide-react";
// import { useGreetings } from "@/hooks/use-greetings";

// interface Greeting {
//   name: string;
//   message: string;
//   timestamp?: string;
// }

// export function GreetingSection() {
//   const { greetings, loading, error, addGreeting } = useGreetings();
//   const [showForm, setShowForm] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);
//   const [formData, setFormData] = useState({ name: "", message: "" });
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

//   // Format timestamp to human-readable format
//   const formatTimestamp = (timestamp?: string): string => {
//     if (!timestamp) return "";
//     try {
//       // Google Forms timestamp format: "M/D/YYYY H:MM:SS AM/PM" or "D/M/YYYY H:MM:SS AM/PM"
//       // Example: "3/18/2026 1:12:50 AM" or "18/3/2026 1:12:50 AM"
//       const timestamp_cleaned = timestamp.trim();
//       const parts = timestamp_cleaned.split(' ');
//       if (parts.length < 2) return timestamp_cleaned;
      
//       const dateParts = parts[0].split('/');
//       const timeParts = parts[1].split(':');
      
//       if (dateParts.length < 3 || timeParts.length < 2) return timestamp_cleaned;
      
//       const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
//       let monthNum = parseInt(dateParts[0]);
//       let day = parseInt(dateParts[1]);
//       let year = dateParts[2];
      
//       // If first part is > 12, it's likely DD/MM/YYYY format, swap them
//       if (monthNum > 12 && day <= 12) {
//         [monthNum, day] = [day, monthNum];
//       }
      
//       const month = (monthNum >= 1 && monthNum <= 12) ? months[monthNum - 1] : months[0];
//       const dayStr = String(day).padStart(2, '0');
//       const hours = String(timeParts[0]).padStart(2, '0');
//       const minutes = String(timeParts[1]).padStart(2, '0');
      
//       return `${dayStr} ${month} ${year} • ${hours}:${minutes}`;
//     } catch (err) {
//       console.error('Timestamp format error:', timestamp, err);
//       return timestamp || "";
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.name.trim() || !formData.message.trim()) {
//       alert("Please fill in both name and message fields");
//       return;
//     }

//     setFormLoading(true);
//     try {
//       await addGreeting(formData.name.trim(), formData.message.trim());
//       setSubmitSuccess(true);
//       setFormData({ name: "", message: "" });
      
//       setTimeout(() => {
//         setSubmitSuccess(false);
//         setShowForm(false);
//       }, 3000);
//     } catch (err) {
//       const errorMsg = err instanceof Error ? err.message : "Failed to submit greeting";
//       if (errorMsg.includes("Tools")) {
//         // Google Form setup instructions
//         alert(errorMsg + "\n\nOnce you set up the form, configure the environment variables in .env");
//       } else {
//         alert("Failed to submit greeting. Please try again.");
//       }
//       console.error("Error:", err);
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   return (
//     <section id="greetings" className="py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-secondary/10">
//       <div className="container mx-auto px-4">
//         <SectionHeading 
//           title="Blessings & Greetings" 
//           subtitle="Share your warm wishes for the couple" 
//         />

//         {/* Greetings List */}
//         {!loading && greetings.length > 0 && (
//           <div className="max-w-4xl mx-auto mb-12 space-y-4">
//             {greetings.map((greeting: Greeting, index: number) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="group"
//               >
//                 <div 
//                   onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
//                   className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary cursor-pointer group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/5"
//                 >
//                   {/* Decorative heart emoji */}
//                   <div className="absolute top-4 right-6 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
//                     💝
//                   </div>

//                   {/* Name and Timestamp */}
//                   <div className="flex items-start justify-between mb-3">
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-primary">
//                         {greeting.name}
//                       </h3>
//                       {greeting.timestamp && (
//                         <p className="text-xs text-gray-400 mt-1">
//                           {formatTimestamp(greeting.timestamp)}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Message - Preview or Full */}
//                   <AnimatePresence mode="wait">
//                     {expandedIndex === index ? (
//                       <motion.p
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap"
//                       >
//                         {greeting.message}
//                       </motion.p>
//                     ) : (
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.2 }}
//                         className="text-gray-600 text-sm line-clamp-2"
//                       >
//                         {greeting.message}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {loading && (
//           <div className="flex justify-center py-12">
//             <Loader2 className="w-8 h-8 animate-spin text-primary" />
//           </div>
//         )}

//         {!loading && greetings.length === 0 && !error && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No greetings yet. Be the first to share your blessings!</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-8 text-red-500 text-sm">
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Add Greeting Form */}
//         <motion.div className="max-w-2xl mx-auto">
//           {!showForm ? (
//             <div className="flex justify-center">
//               <Button
//                 onClick={() => setShowForm(true)}
//                 className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2"
//               >
//                 💝
//                 Add Your Blessing
//               </Button>
//             </div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary/10"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-semibold text-primary">Share Your Blessings</h3>
//                 <button
//                   onClick={() => setShowForm(false)}
//                   className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </button>
//               </div>
              
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Name
//                   </label>
//                   <Input
//                     type="text"
//                     placeholder="Enter your name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     disabled={formLoading}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Your Message
//                   </label>
//                   <Textarea
//                     placeholder="Share your warm wishes and blessings..."
//                     value={formData.message}
//                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                     disabled={formLoading}
//                     className="min-h-24"
//                     required
//                   />
//                 </div>

//                 {submitSuccess && (
//                   <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm">
//                     ✓ Thank you! Your blessing has been submitted. It will appear on the site shortly.
//                   </div>
//                 )}

//                 <div className="flex gap-3 pt-4">
//                   <Button
//                     type="submit"
//                     disabled={formLoading}
//                     className="flex-1 bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
//                   >
//                     {formLoading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4" />
//                         Send Blessing
//                       </>
//                     )}
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => {
//                       setShowForm(false);
//                       setFormData({ name: "", message: "" });
//                     }}
//                     disabled={formLoading}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </form>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
