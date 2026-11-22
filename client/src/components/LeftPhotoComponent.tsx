import { motion } from "framer-motion";

interface LeftPhotoComponentProps {
  videoUrl: string;
}

export function LeftPhotoComponent({ videoUrl }: LeftPhotoComponentProps) {
  return (
    <div className="w-full h-[52vh] sm:h-[60vh] lg:h-screen relative overflow-hidden flex items-center justify-center bg-transparent p-4 sm:p-6 lg:p-10 lg:pt-28">
      <div className="relative w-full h-full max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border border-amber-300/40">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 z-10 pointer-events-none" />
        <motion.video
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}



// import { motion } from "framer-motion";

// interface LeftPhotoComponentProps {
//   videoUrl: string;
// }

// export function LeftPhotoComponent({ videoUrl }: LeftPhotoComponentProps) {
//   return (
//     <div className="w-full lg:w-1/2 relative h-[45vh] sm:h-[50vh] lg:h-auto overflow-hidden flex items-center justify-center bg-white p-4 sm:p-6 lg:p-12">
//       <div className="relative w-full sm:w-4/5 h-full sm:h-4/5 max-w-lg">
//         <div className="absolute inset-0 bg-black/10 z-10 rounded-lg" /> {/* Subtle overlay */}
//         <motion.video
//           initial={{ scale: 1.1, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           src={videoUrl}
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="w-full h-full object-cover object-center rounded-lg shadow-xl"
//         />
//       </div>
//     </div>
//   );
// }
