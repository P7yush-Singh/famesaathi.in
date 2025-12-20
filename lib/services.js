export const SERVICES = {
  instagram: {
    category: "Instagram - Trending Services",
    services: [
      {
        id: "reel_views",
        name: "Instagram Reel Views",
        pricePer1000: 39,
        min: 100,
        max: 1000000000,
        deliveryTime: "30 - 60 minutes",
        description: {
          start: "INSTANT",
          speed: "500K / HOUR",
          refill: "LIFETIME",
          cancel: "YES",
          drop: "NON-DROP",
          quality: "REAL",
          notes: [
            "Real Reel Views.",
            "Use reels link.",
            "Wrong links are non refundable.",
            "Private accounts not accepted.",
            "Start and speed can be slow sometimes."
          ]
        }
      },
      {
        id: "story_views",
        name: "Instagram Story Views",
        pricePer1000: 25,
        min: 100,
        max: 5000000,
        deliveryTime: "15 - 30 minutes",
        description: {
          start: "INSTANT",
          speed: "300K / HOUR",
          refill: "NO",
          cancel: "NO",
          drop: "NON-DROP",
          quality: "REAL",
          notes: [
            "Only public stories.",
            "Story must be active.",
            "No refill available."
          ]
        }
      },
      {
        id: "post_views",
        name: "Instagram Post Views",
        pricePer1000: 20,
        min: 100,
        max: 10000000,
        deliveryTime: "20 - 40 minutes",
        description: {
          start: "INSTANT",
          speed: "400K / HOUR",
          refill: "NO",
          cancel: "YES",
          drop: "LOW",
          quality: "REAL",
          notes: [
            "Post must be public.",
            "No private accounts."
          ]
        }
      }
    ]
  }
};
