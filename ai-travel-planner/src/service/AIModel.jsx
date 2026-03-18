import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_GOOGLE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateTravelPlan(userInput) {

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 1,
    max_tokens: 8192,
    top_p: 0.95,
    response_format: { type: "json_object" },

    messages: [
      {
        role: "user",
        content:
          "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget. Give hotels, itinerary and travel tips in JSON format."
      },

      {
        role: "assistant",
        content: JSON.stringify({
          travel_plan: {
            location: "Las Vegas, Nevada",
            duration: "3 Days",
            target_audience: "Couple",
            budget_category: "Cheap / Budget-Friendly",
            currency: "USD",

            hotel_options: [
              {
                hotelName: "The STRAT Hotel, Casino & Tower",
                hotelAddress: "2000 S Las Vegas Blvd, Las Vegas, NV 89104",
                price: "$45 - $80 per night (weekday)",
                hotelImageUrl:
                  "https://images.trvl-media.com/hotels/1000000/20000/11400/11386/7542167e.jpg",
                geoCoordinates: {
                  latitude: 36.1475,
                  longitude: -115.1555
                },
                rating: 4.0,
                description:
                  "Located at the north end of the Strip, offering some of the lowest rates for a full-scale resort."
              },
              {
                hotelName: "Luxor Hotel & Casino",
                hotelAddress: "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
                price: "$55 - $95 per night",
                hotelImageUrl:
                  "https://mgmresorts.com/content/dam/mgmresorts/luxor/hotel/pyramid-rooms/luxor-hotel-exterior-pyramid.jpg",
                geoCoordinates: {
                  latitude: 36.0955,
                  longitude: -115.1761
                },
                rating: 4.1,
                description:
                  "Iconic pyramid-shaped hotel on the South Strip. Great for couples looking for a themed experience."
              },
              {
                hotelName: "El Cortez Hotel & Casino",
                hotelAddress: "600 E Fremont St, Las Vegas, NV 89101",
                price: "$40 - $70 per night",
                hotelImageUrl:
                  "https://elcortez.com/wp-content/uploads/2021/05/El-Cortez-Exterior.jpg",
                geoCoordinates: {
                  latitude: 36.1689,
                  longitude: -115.1388
                },
                rating: 4.2,
                description:
                  "Historic downtown hotel near Fremont Street Experience."
              }
            ],

            itinerary: {
              day1: {
                theme: "The Iconic Strip Walk",
                bestTimeToStart: "10:00 AM",
                activities: [
                  {
                    placeName: "Welcome to Fabulous Las Vegas Sign",
                    placeDetails:
                      "Popular photo spot for tourists visiting Las Vegas.",
                    placeImageUrl:
                      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Welcome_to_Fabulous_Las_Vegas.jpg",
                    geoCoordinates: {
                      latitude: 36.0821,
                      longitude: -115.1728
                    },
                    ticketPricing: "Free",
                    rating: 4.7,
                    timeToSpend: "30 minutes"
                  }
                ]
              },

              day2: {
                theme: "Old Vegas & Downtown Culture",
                bestTimeToStart: "11:00 AM",
                activities: [
                  {
                    placeName: "Downtown Container Park",
                    placeDetails:
                      "Outdoor shopping center made from shipping containers.",
                    placeImageUrl:
                      "https://downtowncontainerpark.com/wp-content/uploads/2019/12/CP-Mantis.jpg",
                    geoCoordinates: {
                      latitude: 36.1681,
                      longitude: -115.1378
                    },
                    ticketPricing: "Free",
                    rating: 4.5,
                    timeToSpend: "1.5 hours"
                  }
                ]
              },

              day3: {
                theme: "Art & Scenic Views",
                bestTimeToStart: "09:00 AM",
                activities: [
                  {
                    placeName: "Seven Magic Mountains",
                    placeDetails:
                      "Colorful art installation in the Nevada desert.",
                    placeImageUrl:
                      "https://sevenmagicmountains.com/wp-content/uploads/2016/05/SMM_01.jpg",
                    geoCoordinates: {
                      latitude: 35.8383,
                      longitude: -115.2708
                    },
                    ticketPricing: "Free",
                    rating: 4.4,
                    timeToSpend: "1 hour"
                  }
                ]
              }
            },

            travel_tips: [
              "Use the Deuce Bus to travel between the Strip and Downtown cheaply.",
              "Eat off-strip to save money.",
              "Buy water packs from CVS/Walgreens instead of hotel mini bars."
            ]
          }
        })
      },

      {
        role: "user",
        content: userInput
      }
    ]
  });

  return JSON.parse(response.choices[0].message.content);
}