import groomAvatar from '@assets/groomAvatar.png';
import brideAvatar from '@assets/brideAvatar.png';
import coupleImg from '@assets/coupleImg.jpeg';
import coupleBg from '@assets/couple_bg.png';
import coupleVideo from '@assets/couple_video.mp4';
import weddingCardImg from '@assets/wedding_card.png';
import receptionCardImg from '@assets/reception_card.png';

export const weddingData = {
  media: {
    coupleImg,
    coupleBg,
    coupleVideo,
  },
  groom: {
    name: 'Akhil',
    fullName: 'Akhilnadh P C',
    role: 'The Groom',
    address: 'Pullolikkal House, Solvent Road, Irinjalakuda',
    location: 'Anna nagar, Chennai',
    profession: 'Data Scientist',
    company: 'AIR INDIA',
    family: {
      father: 'Dr. P.P Chandran',
      mother: 'Preethy K.S',
    },
    photoUrl: groomAvatar,
    quote: "A storyteller through the lens, capturing life's most beautiful moments one frame at a time.",
    social: {
      instagram: 'http://instagram.com',
    },
  },
  bride: {
    name: 'Sethu',
    fullName: 'Sethulakshmi R',
    role: 'The Bride',
    address: 'Varanattu House, North Aduvassery, South Aduvassery P O, 683578 - Aluva, Ernakulam',
    location: 'Anna nagar, Chennai',
    profession: 'Design Engineer',
    company: 'Larsen & Toubro',
    family: {
      father: 'Mr. Rajesh V Chandran',
      mother: 'Late Seeja Rajesh',
      sister: 'Meenakshi R',
      brother: 'Rakesh R',
    },
    photoUrl: brideAvatar,
    quote: 'A blend of grace and intellect, weaving dreams into reality with every step.',
    social: {
      instagram: 'https://instagram.com',
    },
  },
  wedding: {
    date: new Date('2026-12-29T10:00:00'),
    dateString: 'December 29, 2026',
    dateShort: '29 . 12 . 2026',
    location: 'Anna nagar, Chennai',
    ceremony: {
      title: 'The Muhurtham & Ceremony',
      place: 'Green Park Convention Centre',
      date: 'Tuesday, December 29, 2026',
      time: '10:00 AM – 12:00 PM',
      location: 'Anna nagar, Chennai',
      googleMapUrl: 'https://share.google/FIHKjZx5IddOJtyhM',
      description: 'With hearts full of joy and love, we cordially invite you to witness and bless the sacred union of our souls. Your presence will add grace to our special day as two families become one.',
      invitationCardUrl: weddingCardImg,
    },
    reception: {
      title: 'Evening Wedding Reception',
      place: 'St Thomas Cathedral Convention Centre, Santhome Hall',
      date: 'Tuesday, December 29, 2026',
      time: '6:00 PM Onwards',
      location: 'Anna nagar, Chennai',
      googleMapUrl: 'https://share.google/FIHKjZx5IddOJtyhM',
      description: 'Join us for an evening of delicious food, heartfelt toasts, and celebration under the stars. Your presence is the greatest gift we could ask for.',
      invitationCardUrl: receptionCardImg,
    },
  },










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
