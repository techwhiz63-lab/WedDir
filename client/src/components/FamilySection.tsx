import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { weddingData } from "@/data/weddingData";
import {
  familyMembers,
  getChildren,
  getParents,
  getSpouse,
  getSiblings,
  type FamilyMember,
} from "@/data/familyData";
import { cn } from "@/lib/utils";
import { User, Heart, Sparkles, RotateCcw, Crown } from "lucide-react";

type TabKey = "groom" | "bride";

function PersonAvatar({
  member,
  generation,
  isFocused,
}: {
  member: FamilyMember;
  generation: "parent" | "current" | "child";
  isFocused?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    setImageLoaded(true);
  }, [member.id]);

  const ringColors = {
    parent: "from-amber-500 to-yellow-600",
    current: "from-rose-600 via-amber-500 to-rose-600",
    child: "from-emerald-500 to-teal-600",
  };

  return (
    <div className="relative">
      {isFocused && (
        <motion.div
          layoutId="activeMemberGlow"
          className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-400 blur-sm opacity-85 animate-pulse"
        />
      )}

      <div
        className={cn(
          "relative p-[2.5px] rounded-full bg-gradient-to-tr shadow-md",
          ringColors[generation]
        )}
      >
        {member.profileUrl && imageLoaded ? (
          <img
            src={member.profileUrl}
            alt={member.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover bg-white"
            onError={() => setImageLoaded(false)}
          />
        ) : (
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-50 to-rose-50 flex items-center justify-center text-amber-900">
            <User className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
        )}
      </div>

      {(member.id === "KU" || member.id === "KV") && (
        <span className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow border border-white">
          <Crown className="w-3.5 h-3.5" />
        </span>
      )}
    </div>
  );
}

function PersonCard({
  member,
  onSelect,
  isFocused = false,
  generation = "current",
}: {
  member: FamilyMember;
  onSelect: (id: string) => void;
  isFocused?: boolean;
  generation?: "parent" | "current" | "child";
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => onSelect(member.id)}
      className={cn(
        "group relative flex flex-col items-center gap-2.5 p-3.5 sm:p-4 rounded-2xl border backdrop-blur-md transition-all min-w-[115px] sm:min-w-[135px] flex-shrink-0 cursor-pointer",
        isFocused
          ? "bg-gradient-to-b from-amber-50/95 to-rose-50/95 border-amber-500 shadow-[0_12px_30px_-8px_rgba(180,83,9,0.3)]"
          : "bg-white/80 border-amber-200/70 hover:border-amber-400 hover:bg-white shadow-sm hover:shadow-md"
      )}
    >
      <PersonAvatar member={member} generation={generation} isFocused={isFocused} />

      <div className="text-center">
        <div
          className={cn(
            "font-display font-semibold text-sm sm:text-base leading-tight transition-colors",
            isFocused ? "text-rose-950" : "text-stone-800 group-hover:text-amber-900"
          )}
        >
          {member.name}
        </div>
        {member.nickname && (
          <div className="text-[11px] text-amber-800/80 font-medium mt-0.5">
            ({member.nickname})
          </div>
        )}
      </div>
    </motion.button>
  );
}

function CoupleCard({
  person1,
  person2,
  onSelect,
  focusedId,
  showAsCouple = false,
  generation = "current",
}: {
  person1: FamilyMember;
  person2?: FamilyMember;
  onSelect: (id: string) => void;
  focusedId?: string;
  showAsCouple?: boolean;
  generation?: "parent" | "current" | "child";
}) {
  if (!person2 && !showAsCouple) {
    return (
      <PersonCard
        member={person1}
        onSelect={onSelect}
        isFocused={person1.id === focusedId}
        generation={generation}
      />
    );
  }

  return (
    <div className="relative flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3.5 rounded-3xl border border-amber-300/70 bg-gradient-to-r from-white/70 via-amber-50/60 to-white/70 backdrop-blur-md shadow-md flex-shrink-0">
      <PersonCard
        member={person1}
        onSelect={onSelect}
        isFocused={person1.id === focusedId}
        generation={generation}
      />

      <div className="flex flex-col items-center justify-center px-0.5">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-100 border border-rose-300 flex items-center justify-center shadow-inner">
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 fill-rose-500 animate-pulse" />
        </div>
      </div>

      {person2 && (
        <PersonCard
          member={person2}
          onSelect={onSelect}
          isFocused={person2.id === focusedId}
          generation={generation}
        />
      )}
    </div>
  );
}
function FamilyTree({
  focusedMember,
  onSelectMember,
}: {
  focusedMember: FamilyMember;
  onSelectMember: (id: string) => void;
}) {
  const parents = getParents(focusedMember.id);
  const siblings = getSiblings(focusedMember.id);
  const allSiblings = [focusedMember, ...siblings].sort((a, b) => {
    if (a.order !== null && b.order !== null) return a.order - b.order;
    return 0;
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={focusedMember.id}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4 py-4 w-full"
      >
        {/* LAYER 1: PARENTS */}
        {(parents.father || parents.mother) && (
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-800/70 font-semibold mb-2">
              Parents &amp; Elders
            </span>
            <CoupleCard
              person1={parents.father || parents.mother!}
              person2={parents.father && parents.mother ? parents.mother : undefined}
              onSelect={onSelectMember}
              generation="parent"
            />
            {/* Glowing Golden Stem Connector */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-amber-500 to-rose-400 relative">
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rose-500" />
            </div>
          </div>
        )}

        {/* LAYER 2: FOCUSED GENERATION & SIBLINGS */}
        <div className="w-full overflow-x-auto pb-4">
          <div className="flex flex-col items-center min-w-max mx-auto px-4">
            <div className="flex items-start gap-6 sm:gap-10">
              {allSiblings.map((sibling) => {
                const spouse = sibling.spouse ? getSpouse(sibling.id) : undefined;
                const children = getChildren(sibling.id);

                return (
                  <div key={sibling.id} className="flex flex-col items-center">
                    {spouse ? (
                      <CoupleCard
                        person1={sibling}
                        person2={spouse}
                        onSelect={onSelectMember}
                        focusedId={focusedMember.id}
                        showAsCouple={true}
                        generation="current"
                      />
                    ) : (
                      <PersonCard
                        member={sibling}
                        onSelect={onSelectMember}
                        isFocused={sibling.id === focusedMember.id}
                        generation="current"
                      />
                    )}

                    {/* LAYER 3: CHILDREN */}
                    {children.length > 0 && (
                      <div className="flex flex-col items-center mt-1">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-rose-400 to-emerald-500" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-800/80 font-semibold mb-2 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                          Next Generation
                        </span>
                        <div className="flex flex-wrap justify-center gap-3">
                          {children.map((child) => {
                            const childSpouse = child.spouse ? getSpouse(child.id) : undefined;

                            if (childSpouse) {
                              return (
                                <CoupleCard
                                  key={child.id}
                                  person1={child}
                                  person2={childSpouse}
                                  onSelect={onSelectMember}
                                  generation="child"
                                />
                              );
                            }

                            return (
                              <PersonCard
                                key={child.id}
                                member={child}
                                onSelect={onSelectMember}
                                generation="child"
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Generation Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 px-5 py-2.5 rounded-full bg-white/75 backdrop-blur-md border border-amber-200/70 text-xs text-stone-600 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600" />
            <span>Parents</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-rose-600 to-amber-500" />
            <span>Current Generation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600" />
            <span>Children</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function FamilySection() {
  const [tab, setTab] = useState<TabKey>("groom");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const getInitialMember = (side: TabKey) => {
    if (side === "groom") {
      return familyMembers.find((m) => m.id === "KU") || familyMembers.find((m) => m.familySide === side);
    } else {
      return familyMembers.find((m) => m.id === "KV") || familyMembers.find((m) => m.familySide === side);
    }
  };

  const initialMember = getInitialMember(tab)!;
  const focusedMember = selectedMemberId
    ? familyMembers.find((m) => m.id === selectedMemberId) || initialMember
    : initialMember;

  const isRootFocused = focusedMember.id === initialMember.id;

  const handleTabChange = (newTab: TabKey) => {
    setTab(newTab);
    setSelectedMemberId(null);
  };

  const handleSelectMember = (id: string) => {
    if (id === "KU") {
      setTab("groom");
      setSelectedMemberId("KU");
      return;
    }
    if (id === "KV") {
      setTab("bride");
      setSelectedMemberId("KV");
      return;
    }
    setSelectedMemberId(id);
  };

  const tabs: TabKey[] = ["groom", "bride"];

  return (
    <section
      id="family"
      className="relative py-20 md:py-28 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="Family Tree" subtitle="Our Beloved Roots" />

        <p className="max-w-2xl mx-auto text-center text-sm sm:text-base text-stone-600 leading-relaxed">
          Tap on any family member card to explore their parents, siblings, and children across generations.
        </p>

        {/* Animated Family Side Switcher */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="inline-flex p-1.5 rounded-full bg-white/85 backdrop-blur-md border border-amber-300/70 shadow-md">
            {tabs.map((key) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTabChange(key)}
                  className={cn(
                    "relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer",
                    active ? "text-amber-50" : "text-stone-700 hover:text-rose-900"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="familyTabIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-900 via-amber-800 to-rose-900 shadow"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {key === "groom" ? `${weddingData.groom.name}'s Family` : `${weddingData.bride.name}'s Family`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Reset Button when exploring deeper relatives */}
          {!isRootFocused && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              type="button"
              onClick={() => setSelectedMemberId(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-100/90 hover:bg-amber-200 text-amber-950 border border-amber-400/60 text-xs font-semibold shadow-sm transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to {tab === "groom" ? weddingData.groom.name : weddingData.bride.name}</span>
            </motion.button>
          )}
        </div>

        {/* Interactive Family Tree Visualization */}
        <div className="mt-10 flex justify-center">
          <FamilyTree
            focusedMember={focusedMember}
            onSelectMember={handleSelectMember}
          />
        </div>
      </div>
    </section>
  );
}





// import { useState, useEffect } from "react";
// import { SectionHeading } from "@/components/SectionHeading";
// import {
//   familyMembers,
//   getChildren,
//   getParents,
//   getSpouse,
//   getSiblings,
//   type FamilyMember,
// } from "@/data/familyData";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { User, Users } from "lucide-react";

// type TabKey = "groom" | "bride";

// // Avatar component - shows profile image if available, otherwise default icon
// function PersonAvatar({ member, generation }: { member: FamilyMember; generation: "parent" | "current" | "child" }) {
//   const [imageLoaded, setImageLoaded] = useState(true);

//   useEffect(() => {
//     setImageLoaded(true);
//   }, [member.id]);

//   // Color coding for generations
//   const generationColors = {
//     parent: "bg-blue-500",
//     current: "bg-primary",
//     child: "bg-green-500"
//   };
  
//   if (member.profileUrl && imageLoaded) {
//     return (
//       <div className="relative">
//         <img 
//           src={member.profileUrl} 
//           alt={member.name}
//           className="w-12 h-12 rounded-full object-cover"
//           onError={() => setImageLoaded(false)}
//         />
//         {/* Generation indicator ring */}
//         <div className={cn(
//           "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
//           generationColors[generation]
//         )} />
//       </div>
//     );
//   }
  
//   return (
//     <div className={cn(
//       "w-12 h-12 rounded-full flex items-center justify-center text-white",
//       generationColors[generation]
//     )}>
//       <User className="w-6 h-6" />
//     </div>
//   );
// }

// // Person card component
// function PersonCard({ 
//   member, 
//   onSelect, 
//   isFocused = false,
//   generation = "current"
// }: { 
//   member: FamilyMember; 
//   onSelect: (id: string) => void;
//   isFocused?: boolean;
//   generation?: "parent" | "current" | "child";
// }) {
//   return (
//     <button
//       onClick={() => onSelect(member.id)}
//       className={cn(
//         "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:shadow-lg min-w-[100px] flex-shrink-0",
//         isFocused 
//           ? "bg-primary/10 border-primary shadow-md scale-105" 
//           : "bg-card border-border hover:border-primary/50"
//       )}
//     >
//       <PersonAvatar member={member} generation={generation} />
//       <div className="text-center">
//         <div className="font-semibold text-sm text-foreground">
//           {member.name}
//         </div>
//         {member.nickname && (
//           <div className="text-xs text-muted-foreground">({member.nickname})</div>
//         )}
//       </div>
//     </button>
//   );
// }

// // Couple card (for parents or person with spouse)
// function CoupleCard({ 
//   person1, 
//   person2, 
//   onSelect,
//   focusedId,
//   showAsCouple = false,
//   generation = "current"
// }: { 
//   person1: FamilyMember; 
//   person2?: FamilyMember;
//   onSelect: (id: string) => void;
//   focusedId?: string;
//   showAsCouple?: boolean;
//   generation?: "parent" | "current" | "child";
// }) {
//   // Always show as couple if person2 exists or showAsCouple is true
//   if (!person2 && !showAsCouple) {
//     return <PersonCard member={person1} onSelect={onSelect} isFocused={person1.id === focusedId} generation={generation} />;
//   }

//   return (
//     <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-border bg-card flex-shrink-0">
//       <PersonCard member={person1} onSelect={onSelect} isFocused={person1.id === focusedId} generation={generation} />
//       <Users className="w-6 h-6 text-muted-foreground" />
//       {person2 && <PersonCard member={person2} onSelect={onSelect} isFocused={person2.id === focusedId} generation={generation} />}
//     </div>
//   );
// }

// // Main tree visualization component
// function FamilyTree({ 
//   focusedMember, 
//   onSelectMember
// }: { 
//   focusedMember: FamilyMember;
//   onSelectMember: (id: string) => void;
// }) {
//   const parents = getParents(focusedMember.id);
//   const siblings = getSiblings(focusedMember.id);
//   const allSiblings = [focusedMember, ...siblings].sort((a, b) => {
//     if (a.order !== null && b.order !== null) return a.order - b.order;
//     return 0;
//   });

//   return (
//     <div className="flex flex-col items-center gap-8 py-8 w-full">
//       {/* Layer 1: Parents */}
//       {(parents.father || parents.mother) && (
//         <div className="flex flex-col items-center gap-4">
//           <CoupleCard 
//             person1={parents.father || parents.mother!} 
//             person2={parents.father && parents.mother ? parents.mother : undefined}
//             onSelect={onSelectMember}
//             generation="parent"
//           />
//           {/* Connector line */}
//           <div className="w-0.5 h-8 bg-border" />
//         </div>
//       )}

//       {/* Layer 2: Focused person and siblings - Horizontal scrollable */}
//       <div className="w-full overflow-x-auto">
//         <div className="flex flex-col items-center gap-4 min-w-max px-4">
//           <div className="flex items-start gap-6">
//             {allSiblings.map((sibling) => {
//               const spouse = sibling.spouse ? getSpouse(sibling.id) : undefined;
//               const children = getChildren(sibling.id);
              
//               return (
//                 <div key={sibling.id} className="flex flex-col items-center gap-4">
//                   {/* Sibling with spouse - always show as couple if spouse exists */}
//                   {spouse ? (
//                     <CoupleCard 
//                       person1={sibling} 
//                       person2={spouse}
//                       onSelect={onSelectMember}
//                       focusedId={focusedMember.id}
//                       showAsCouple={true}
//                       generation="current"
//                     />
//                   ) : (
//                     <PersonCard 
//                       member={sibling} 
//                       onSelect={onSelectMember}
//                       isFocused={sibling.id === focusedMember.id}
//                       generation="current"
//                     />
//                   )}
                  
//                   {/* Layer 3: Children */}
//                   {children.length > 0 && (
//                     <>
//                       {/* Connector line */}
//                       <div className="w-0.5 h-8 bg-border" />
//                       <div className="flex flex-col items-center gap-3">
//                         <div className="text-xs font-medium text-muted-foreground">
//                           Children
//                         </div>
//                         <div className="flex flex-col gap-2">
//                           {children.map((child) => {
//                             const childSpouse = child.spouse ? getSpouse(child.id) : undefined;
                            
//                             // Show as couple if child has spouse
//                             if (childSpouse) {
//                               return (
//                                 <div key={child.id} className="flex items-center gap-2 p-2 rounded-lg border border-border/50 bg-card/50">
//                                   <PersonCard 
//                                     member={child} 
//                                     onSelect={onSelectMember}
//                                     generation="child"
//                                   />
//                                   <Users className="w-4 h-4 text-muted-foreground" />
//                                   <PersonCard 
//                                     member={childSpouse} 
//                                     onSelect={onSelectMember}
//                                     generation="child"
//                                   />
//                                 </div>
//                               );
//                             }
                            
//                             // Show as single person if no spouse
//                             return (
//                               <PersonCard 
//                                 key={child.id} 
//                                 member={child} 
//                                 onSelect={onSelectMember}
//                                 generation="child"
//                               />
//                             );
//                           })}
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
      
//       {/* Generation Legend */}
//       <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-blue-500" />
//           <span>Parents</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-primary" />
//           <span>Current Generation</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <div className="w-3 h-3 rounded-full bg-green-500" />
//           <span>Children</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function FamilySection() {
//   const [tab, setTab] = useState<TabKey>("groom");
//   const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

//   // Get initial member - Akhil Nadh PC (groom) and Sethulakshmi R (bride)
//   const getInitialMember = (side: TabKey) => {
//     if (side === "groom") {
//       // Find Akhil Nadh PC (ID: KU)
//       return familyMembers.find(m => m.id === "KU") || familyMembers.find(m => m.familySide === side);
//     } else {
//       // Find Sethulakshmi R (ID: KV)
//       return familyMembers.find(m => m.id === "KV") || familyMembers.find(m => m.familySide === side);
//     }
//   };

//   const focusedMember = selectedMemberId 
//     ? familyMembers.find(m => m.id === selectedMemberId) || getInitialMember(tab)!
//     : getInitialMember(tab)!;

//   const handleTabChange = (newTab: TabKey) => {
//     setTab(newTab);
//     setSelectedMemberId(null); // Reset selection when changing tabs
//   };

//   const handleSelectMember = (id: string) => {
//     // If clicking on Akhil (KU), switch to groom's family
//     if (id === "KU") {
//       setTab("groom");
//       setSelectedMemberId("KU");
//       return;
//     }
    
//     // If clicking on Sethulakshmi (KV), switch to bride's family
//     if (id === "KV") {
//       setTab("bride");
//       setSelectedMemberId("KV");
//       return;
//     }
    
//     // Otherwise, just select the member
//     setSelectedMemberId(id);
//   };

//   return (
//     <section
//       id="family"
//       className="relative bg-background py-20 md:py-24 lg:py-28"
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <SectionHeading
//           title="Family Tree"
//           subtitle="Our Families"
//         />

//         <p className="mt-4 max-w-3xl mx-auto text-center text-sm sm:text-base text-muted-foreground leading-relaxed">
//           Explore our families in detail. Click on any name to navigate through parents,
//           siblings, and children. The color-coded generations help you understand the family structure.
//         </p>

//         {/* Tabs */}
//         <div className="mt-8 flex justify-center">
//           <div className="inline-flex rounded-full border border-border/80 bg-muted/50 p-1 text-xs sm:text-sm">
//             <Button
//               variant={tab === "groom" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => handleTabChange("groom")}
//               className={cn(
//                 "rounded-full px-6",
//                 tab === "groom" && "shadow-sm"
//               )}
//             >
//               Akhil&apos;s Family
//             </Button>
//             <Button
//               variant={tab === "bride" ? "default" : "ghost"}
//               size="sm"
//               onClick={() => handleTabChange("bride")}
//               className={cn(
//                 "rounded-full px-6",
//                 tab === "bride" && "shadow-sm"
//               )}
//             >
//               Sethu&apos;s Family
//             </Button>
//           </div>
//         </div>

//         {/* Family tree visualization */}
//         <div className="mt-12 flex justify-center">
//           <FamilyTree 
//             focusedMember={focusedMember} 
//             onSelectMember={handleSelectMember}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

