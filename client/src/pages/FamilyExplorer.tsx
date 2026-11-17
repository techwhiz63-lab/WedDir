import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Users } from "lucide-react";

// ============================================================================
// 1. FAMILY MEMBERS LIST (Photos load automatically from /images/{ID}.jpg)
// ============================================================================
interface Member {
  id: string;
  name: string;
  father?: string;
  mother?: string;
  spouse?: string;
  nickname?: string;
}

const FAMILY_LIST: Member[] = [
  // ==========================================================================
  // GROOM'S SIDE (Default Tab ID: "KU")
  // ==========================================================================

  // 1. Groom's Paternal Grandparents (Father's Parents)
  { id: "G_PGF", name: "Govindan Nair", spouse: "G_PGM" },
  { id: "G_PGM", name: "Kamala Devi", spouse: "G_PGF" },

  // 2. Groom's Maternal Grandparents (Mother's Parents)
  { id: "G_MGF", name: "Sankaran Kutty", spouse: "G_MGM" },
  { id: "G_MGM", name: "Savithri Amma", spouse: "G_MGF" },

  // 3. Groom's Parents & Father's Siblings (Uncles / Aunts)
  { id: "G_DAD", name: "Mohan Das", father: "G_PGF", mother: "G_PGM", spouse: "G_MOM" },
  { id: "G_MOM", name: "Sunitha Mohan", father: "G_MGF", mother: "G_MGM", spouse: "G_DAD" },
  { id: "G_UNCLE", name: "Haridas", father: "G_PGF", mother: "G_PGM", spouse: "G_AUNT" },
  { id: "G_AUNT", name: "Geetha Haridas", spouse: "G_UNCLE" },

  // 4. Groom, Groom's Siblings & Cousins
  { id: "KU", name: "Rohan Das", father: "G_DAD", mother: "G_MOM", spouse: "KV" }, // <-- Groom (Keep ID "KU")
  { id: "G_BRO", name: "", father: "G_DAD", mother: "G_MOM" }, 
  { id: "G_SIS", name: "Sneha Das", father: "G_DAD", mother: "G_MOM", spouse: "G_BIL", nickname: "Chinnu" },
  { id: "G_BIL", name: "Karthik Menon", spouse: "G_SIS" },
  { id: "G_COUSIN", name: "Nikhil", father: "G_UNCLE", mother: "G_AUNT" },

  // 5. Next Generation (Nephews / Nieces)
  { id: "G_NIECE", name: "Aarav Karthik", father: "G_BIL", mother: "G_SIS" },


  // ==========================================================================
  // BRIDE'S SIDE (Default Tab ID: "KV")
  // ==========================================================================

  // 1. Bride's Paternal Grandparents (Father's Parents)
  { id: "B_PGF", name: "Damodaran Pillai", spouse: "B_PGM" },
  { id: "B_PGM", name: "Bhanumathi Amma", spouse: "B_PGF" },

  // 2. Bride's Maternal Grandparents (Mother's Parents)
  { id: "B_MGF", name: "Vasudevan", spouse: "B_MGM" },
  { id: "B_MGM", name: "Leelavathi", spouse: "B_MGF" },

  // 3. Bride's Parents & Father's Siblings (Uncles / Aunts)
  { id: "B_DAD", name: "Vinod Kumar", father: "B_PGF", mother: "B_PGM", spouse: "B_MOM" },
  { id: "B_MOM", name: "Radhika Vinod", father: "B_MGF", mother: "B_MGM", spouse: "B_DAD" },
  { id: "B_AUNT", name: "Sindhu Pillai", father: "B_PGF", mother: "B_PGM", spouse: "B_UNCLE" },
  { id: "B_UNCLE", name: "Pradeep", spouse: "B_AUNT" },

  // 4. Bride, Bride's Siblings & Cousins
  { id: "KV", name: "Meera Vinod", father: "B_DAD", mother: "B_MOM", spouse: "KU" }, // <-- Bride (Keep ID "KV")
  { id: "B_SIS", name: "Kavya Vinod", father: "B_DAD", mother: "B_MOM", nickname: "Ammu" },
  { id: "B_COUSIN", name: "Aditya", father: "B_UNCLE", mother: "B_AUNT" },
];



// ============================================================================
// 2. RELATIONSHIP HELPERS
// ============================================================================
const findMember = (id?: string) => FAMILY_LIST.find((m) => m.id === id);

const getParents = (member: Member) => ({
  father: findMember(member.father),
  mother: findMember(member.mother),
});

const getSpouse = (member: Member) => findMember(member.spouse);

const getSiblings = (member: Member) =>
  FAMILY_LIST.filter(
    (m) =>
      m.id !== member.id &&
      ((member.father && m.father === member.father) ||
        (member.mother && m.mother === member.mother))
  );

const getChildren = (memberId: string) =>
  FAMILY_LIST.filter((m) => m.father === memberId || m.mother === memberId);

// ============================================================================
// 3. UI COMPONENTS
// ============================================================================
type Generation = "parent" | "current" | "child";

function PersonAvatar({
  member,
  generation,
}: {
  member: Member;
  generation: Generation;
}) {
  const [imageLoaded, setImageLoaded] = useState(true);
  const imageSrc = `/images/${member.id}.jpg`;

  useEffect(() => {
    setImageLoaded(true);
  }, [member.id]);

  const colors: Record<Generation, string> = {
    parent: "bg-blue-500",
    current: "bg-primary",
    child: "bg-green-500",
  };

  if (imageLoaded) {
    return (
      <div className="relative">
        <img
          src={imageSrc}
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover"
          onError={() => setImageLoaded(false)}
        />
        <div
          className={cn(
            "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
            colors[generation]
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center text-white",
        colors[generation]
      )}
    >
      <User className="w-6 h-6" />
    </div>
  );
}

function PersonCard({
  member,
  onSelect,
  isFocused = false,
  generation = "current",
}: {
  member: Member;
  onSelect: (id: string) => void;
  isFocused?: boolean;
  generation?: Generation;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(member.id)}
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:shadow-lg min-w-[100px] flex-shrink-0",
        isFocused
          ? "bg-primary/10 border-primary shadow-md scale-105"
          : "bg-card border-border hover:border-primary/50"
      )}
    >
      <PersonAvatar member={member} generation={generation} />
      <div className="text-center">
        <div className="font-semibold text-sm text-foreground">
          {member.name}
        </div>
        {member.nickname && (
          <div className="text-xs text-muted-foreground">
            ({member.nickname})
          </div>
        )}
      </div>
    </button>
  );
}

function CoupleCard({
  person1,
  person2,
  onSelect,
  focusedId,
  generation = "current",
}: {
  person1: Member;
  person2?: Member;
  onSelect: (id: string) => void;
  focusedId?: string;
  generation?: Generation;
}) {
  if (!person2) {
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
    <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-border bg-card flex-shrink-0">
      <PersonCard
        member={person1}
        onSelect={onSelect}
        isFocused={person1.id === focusedId}
        generation={generation}
      />
      <Users className="w-6 h-6 text-muted-foreground" />
      <PersonCard
        member={person2}
        onSelect={onSelect}
        isFocused={person2.id === focusedId}
        generation={generation}
      />
    </div>
  );
}
// ============================================================================
// ============================================================================
// 4. MAIN PAGE COMPONENT
// ============================================================================
export default function FamilyExplorerPage() {
  const [tab, setTab] = useState<"groom" | "bride">("groom");
  const [selectedId, setSelectedId] = useState<string>("KU");

  // Use FAMILY_LIST[0] as fallback so focusedMember is always a single Member object
  const focusedMember = findMember(selectedId) || FAMILY_LIST[0];
  const parents = getParents(focusedMember);
  const allSiblings = [focusedMember, ...getSiblings(focusedMember)];

  const handleTabChange = (newTab: "groom" | "bride") => {
    setTab(newTab);
    setSelectedId(newTab === "groom" ? "KU" : "KV");
  };

  const handleSelect = (id: string) => {
    if (id === "KU") setTab("groom");
    if (id === "KV") setTab("bride");
    setSelectedId(id);
  };

  // Dynamic tab names pulled directly from KU and KV in FAMILY_LIST
  const groomName = findMember("KU")?.name.split(" ")[0] || "Groom";
  const brideName = findMember("KV")?.name.split(" ")[0] || "Bride";

  return (
    <div className="bg-background min-h-screen overflow-auto py-12">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Groom / Bride Tabs */}
        <div className="flex justify-center space-x-2 mb-8">
          <Button
            variant={tab === "groom" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTabChange("groom")}
            className={cn("rounded-full px-6", tab === "groom" && "shadow-sm")}
          >
            {groomName}&apos;s Family
          </Button>
          <Button
            variant={tab === "bride" ? "default" : "ghost"}
            size="sm"
            onClick={() => handleTabChange("bride")}
            className={cn("rounded-full px-6", tab === "bride" && "shadow-sm")}
          >
            {brideName}&apos;s Family
          </Button>
        </div>

        {/* Family Tree Visualization */}
        <div className="flex flex-col items-center gap-8 py-8 w-full">
          {/* Layer 1: Parents */}
          {(parents.father || parents.mother) && (
            <div className="flex flex-col items-center gap-4">
              <CoupleCard
                person1={parents.father || parents.mother!}
                person2={
                  parents.father && parents.mother ? parents.mother : undefined
                }
                onSelect={handleSelect}
                generation="parent"
              />
              <div className="w-0.5 h-8 bg-border" />
            </div>
          )}

          {/* Layer 2: Focused Person & Siblings */}
          <div className="w-full overflow-x-auto">
            <div className="flex flex-col items-center gap-4 min-w-max px-4 mx-auto">
              <div className="flex items-start gap-6">
                {allSiblings.map((sibling) => {
                  const spouse = getSpouse(sibling);
                  const children = getChildren(sibling.id);

                  return (
                    <div
                      key={sibling.id}
                      className="flex flex-col items-center gap-4"
                    >
                      {spouse ? (
                        <CoupleCard
                          person1={sibling}
                          person2={spouse}
                          onSelect={handleSelect}
                          focusedId={focusedMember.id}
                          generation="current"
                        />
                      ) : (
                        <PersonCard
                          member={sibling}
                          onSelect={handleSelect}
                          isFocused={sibling.id === focusedMember.id}
                          generation="current"
                        />
                      )}

                      {/* Layer 3: Children */}
                      {children.length > 0 && (
                        <>
                          <div className="w-0.5 h-8 bg-border" />
                          <div className="flex flex-col items-center gap-3">
                            <div className="text-xs font-medium text-muted-foreground">
                              Children
                            </div>
                            <div className="flex flex-col gap-2">
                              {children.map((child) => {
                                const childSpouse = getSpouse(child);

                                return childSpouse ? (
                                  <div
                                    key={child.id}
                                    className="flex items-center gap-2 p-2 rounded-lg border border-border/50 bg-card/50"
                                  >
                                    <PersonCard
                                      member={child}
                                      onSelect={handleSelect}
                                      generation="child"
                                    />
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                    <PersonCard
                                      member={childSpouse}
                                      onSelect={handleSelect}
                                      generation="child"
                                    />
                                  </div>
                                ) : (
                                  <PersonCard
                                    key={child.id}
                                    member={child}
                                    onSelect={handleSelect}
                                    generation="child"
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Generation Legend */}
          <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Parents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>Current Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Children</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




// import { useState, useEffect } from "react";
// import {
//   familyMembers, 
//   getChildren,
//   getParents,
//   getSiblings,
//   getSpouse,
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

// export default function FamilyExplorerPage() {
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
//     <div className="bg-background min-h-screen overflow-auto py-12">
//       <section className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Tab selector */}
//         <div className="flex justify-center space-x-2 mb-8">
//           <Button
//             variant={tab === "groom" ? "default" : "ghost"}
//             size="sm"
//             onClick={() => handleTabChange("groom")}
//             className={cn("rounded-full px-6", tab === "groom" && "shadow-sm")}
//           >
//             Akhil&apos;s Family
//           </Button>
//           <Button
//             variant={tab === "bride" ? "default" : "ghost"}
//             size="sm"
//             onClick={() => handleTabChange("bride")}
//             className={cn("rounded-full px-6", tab === "bride" && "shadow-sm")}
//           >
//             Sethu&apos;s Family
//           </Button>
//         </div>

//         {/* Family tree */}
//         <div className="flex justify-center">
//           <FamilyTree 
//             focusedMember={focusedMember} 
//             onSelectMember={handleSelectMember}
//           />
//         </div>
//       </section>
//     </div>
//   );
// }
