// import groomAvatar from "WedDir\client\public\images\couple\groom.png";
// import brideAvatar from "WedDir\client\public\images\couple\bride.png";
// import coupleImg from "WedDir\client\public\images\couple\coupleI-banner.jpeg";
// import coupleBg from "WedDir\client\public\images\couple\couple-cutout.png";
// import coupleVideo from "WedDir\client\public\video\couple_video.mp4";
// import weddingCardImg from "WedDir\client\public\images\invites\wedding_card.png";
// import receptionCardImg from "WedDir\client\public\images\invites\reception_card.png";


export const weddingData = {
  musicUrl: "/audio/wedding-music.mp3",

  groom: {
    name: "Rohan",
    fullName: "Rohan Das",
    role: "The Groom",
    profession: "Software Architect",
    company: "TechCorp",
    address: "Kochi, Kerala",
    location: "Kochi, Kerala",
    quote: "From the moment our paths crossed, every day has felt like a celebration.",
    photoUrl: "/images/couple/groom.jpg",
    family: {
      father: "Mohan Das",
      mother: "Sunitha Mohan",
      sister: "Sneha Das",
      brother: "",
    },
    social: {
      instagram: "https://instagram.com",
      linkedin: "",
    },
  },

  bride: {
    name: "Meera",
    fullName: "Meera Vinod",
    role: "The Bride",
    profession: "Product Designer",
    company: "DesignStudio",
    address: "Thiruvananthapuram, Kerala",
    location: "Thiruvananthapuram, Kerala",
    quote: "In you, I found my calm, my laughter, and my forever home.",
    photoUrl: "/images/couple/bride.jpg",
    family: {
      father: "Vinod Kumar",
      mother: "Radhika Vinod",
      sister: "Kavya Vinod",
      brother: "",
    },
    social: {
      instagram: "https://instagram.com",
      linkedin: "",
    },
  },

  couple: {
    photoWithoutBg: "/images/couple/couple-cutout.png",
    videoUrl: "/video/couple-video.mp4",
  },

  media: {
    coupleVideo: "/video/couple-video.mp4",
    coupleImg: "/images/couple/couple-banner.jpg",
    coupleBg: "/images/hero-bg.jpg",
  },

  wedding: {
    date: new Date("2026-12-29T10:30:00"),
    dateShort: "December 29, 2026",
    dateString: "Tuesday, December 29, 2026",
    location: "Kerala, India",

    ceremony: {
      title: "Wedding Muhurtham",
      place: "Guruvayur Temple Auditorium",
      date: "December 29, 2026",
      time: "10:30 AM - 11:30 AM",
      location: "East Nada, Guruvayur, Thrissur, Kerala",
      googleMapUrl: "https://google.com",
      description: "With the blessings of our parents and elders, we invite you to witness our sacred union.",
      invitationCardUrl: "/images/invites/wedding-card.png",
    },

    reception: {
      title: "Evening Wedding Reception",
      place: "Grand Hyatt Convention Centre",
      date: "December 29, 2026",
      time: "6:00 PM - 10:00 PM",
      location: "Bolgatty Island, Kochi, Kerala",
      googleMapUrl: "https://google.com",
      description: "Join us for an evening of music, dinner, and joyous celebration.",
      invitationCardUrl: "/images/invites/reception-card.png",
    },
  },

  people: [
    {
      name: "Sneha Das",
      relationship: "Groom's Sister",
      side: "groom",
      profileUrl: "/images/people/person-1.jpg",
      instagramUrl: "",
    },
    {
      name: "Kavya Vinod",
      relationship: "Bride's Sister",
      side: "bride",
      profileUrl: "/images/people/person-2.jpg",
      instagramUrl: "",
    },
  ],
};










// import groomAvatar from "@assets/groomAvatar.png";
// import brideAvatar from "@assets/brideAvatar.png";
// import coupleImg from "@assets/coupleImg.jpeg";
// import coupleBg from "@assets/couple_bg.png";
// import coupleVideo from "@assets/couple_video.mp4";
// import weddingCardImg from "@assets/wedding_card.png";
// import receptionCardImg from "@assets/reception_card.png";

// export const weddingData = {
//   groom: {
//     name: "Groom",//
//     fullName: "Groom fullname PC",//
//     role: "The Groom",
//     address: "Pullolikkal House, Solvent Road, Irinjalakuda",//
//     location: "Irinjalakuda, Kerala",//
//     profession: "Datascientist",//
//     family:{
//       father: "Dr. P.P Chandran ",//
//       mother: "Preethy K.S",//
//     },
//     jobTitle: "Datascientist",//
//     company: "AIR INDIA",//
//     photoUrl: groomAvatar,
//     quote: "A storyteller through the lens, capturing life's most beautiful moments one frame at a time.",
//     social: {
//       linkedin: null,
//       instagram: "http://instagram.com/akhilnadhpc",//
//     },
//   },
//   bride: {
//     name: "Sethu",
//     fullName: "Sethulakshmi R",
//     role: "The Bride",
//     address: "Varanattu house, North Aduvassery, South Aduvassery P O, 683578 - Aluva, Ernakulam",
//     location: "Aluva, Ernakulam, Kerala",
//     profession: "Design Engineer",
//     jobTitle: "Design Engineer",
//     company: "Larsen & Toubro",
//     family:{
//       father: "Mr. Rajesh V Chandran",
//       mother: "Seeja Rajesh (late)",
//       sister: "Meenakshi R",
//       brother:"Rakesh R"
//     },
//     photoUrl: brideAvatar,
//     quote: "A blend of grace and intellect, weaving dreams into reality with every step.",
//     social: {
//       linkedin: "https://www.instagram.com/ammu_l.a.k.s.h.m.i/",
//       instagram: "https://www.instagram.com/ammu_l.a.k.s.h.m.i/",
//     },
//   },
//   wedding: {
//     date: new Date("2026-12-29T10:00:00"),
//     dateString: "December 29, 2026",
//     dateShort: "29.12.2026",
//     location: "Irinjalakuda",
//     ceremony: {
//       title: "Akhil Weds Sethu Wedding Ceremony",
//       place: "Green Park Convention Centre",
//       date: "Sunday, December 29, 2026",
//       time: "10:00 AM - 12:00 PM",
//       location: "NH 544, OppMGF Hyundai, Desom, Aluva, Kerala 683102",
//       geolocation: "Deshom, Aluva, Kerala",
//       googleMapUrl: "https://maps.app.goo.gl/vD2NDApQhEApS83U9",
//       description: "With hearts full of joy and love, we cordially invite you to witness and bless the sacred union of our souls. Your presence will add grace to our special day as two families become one.",
//       invitationCardUrl: weddingCardImg,
//     },
//     reception: {
//       title: "Akhil Weds Sethu Reception",
//       place: "St Thomas Cathedral Convention Centre, Santhome Hall",
//       date: "Sunday, December 29, 2026",
//       time: "6:00 PM Onwards",
//       location: "Irinjalakuda, Thrissur, Kerala 680121",
//       geolocation: null,
//       googleMapUrl: "https://share.google/b9sHKzjQIVpFsKGe0",
//       description: "Join us for an evening of delicious food, heartfelt toasts, and celebration under the stars. Your presence is the greatest gift we could ask for.",
//       invitationCardUrl: receptionCardImg,
//     },
//   },
  couple: {
    photoUrl: coupleImg,
    photoWithoutBg: coupleBg,
    videoUrl: coupleVideo,
  },
  people: [
    {
      name: "Father of Groom",
      profileUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      relationship: "Father",
      side: "groom",
      instagramUrl: null,
    },
    {
      name: "Mother of Groom",
      profileUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      relationship: "Mother",
      side: "groom",
      instagramUrl: null,
    },
    {
      name: "Father of Bride",
      profileUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      relationship: "Father",
      side: "bride",
      instagramUrl: null,
    },
    {
      name: "Mother of Bride",
      profileUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      relationship: "Mother",
      side: "bride",
      instagramUrl: null,
    },
    {
      name: "Best Man",
      profileUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      relationship: "Best Friend",
      side: "groom",
      instagramUrl: null,
    },
    {
      name: "Maid of Honor",
      profileUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      relationship: "Best Friend",
      side: "bride",
      instagramUrl: null,
    },
  ],
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552",
      alt: "Wedding moment 1",
    },
    {
      url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff",
      alt: "Wedding moment 2",
    },
    {
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866",
      alt: "Wedding moment 3",
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
      alt: "Wedding moment 4",
    },
    {
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
      alt: "Wedding moment 5",
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
      alt: "Wedding moment 6",
    },
    {
      url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e",
      alt: "Wedding moment 7",
    },
    {
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
      alt: "Wedding moment 8",
    },
  ],
};
