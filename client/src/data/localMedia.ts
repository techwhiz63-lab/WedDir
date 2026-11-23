// client/src/data/localMedia.ts
export const LOCAL_MEDIA = {
  logo: "/images/logo.jpeg",
  heroBg: "/images/hero-bg.jpg",
  engagementBg: "/images/engagement-bg.jpg",
  coupleVideo: "/video/couple_video.mp4",
  musicUrl: "/audio/wedding-music.mp3",
  groomPhoto: "/images/couple/groom.png",
  bridePhoto: "/images/couple/bride.png",
  coupleCutout: "/images/couple/couple-cutout.png",
  coupleBanner: "/images/couple/coupleI-banner.jpeg",
  weddingCard: "/images/invites/wedding_card.png",
  receptionCard: "/images/invites/reception_card.png",
  person1: "/images/people/person-1.jpeg",
  person2: "/images/people/person-2.jpeg",
  getFamilyAvatar: (id: string) =>
    id === "KU" || id === "KV"
      ? `/images/family/${id}.jpeg`
      : `/family_pics/${id}.jpeg`,
};
