export const SelectedTravelesList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'For solo travelers',
        icon: '👀',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers (partner, friend, etc)',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving people',
        icon: '🏡',
        people: '3-5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill seekes',
        icon: '🗿',
        people: '5-10 People'
    }
]




export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💸',
    },
    {
        id: 2,
        title: 'Mid-Range',
        desc: 'Comfortable and affordable',
        icon: '💰',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Premium and comfortable',
        icon: '💎',
    }
]



export const AI_PROMPT = `You are a travel agent. Create a detailed Travel Plan for Location : {location} for {days} days. The budget is {budget}. The group size is {people}. The interests are {interests}. The Travel Plan should include:
1. Places to visit
2. Daily breakdown of activities
3. Accommodation recommendations
4. Transportation suggestions
5. Food recommendations
6. Budget breakdown
7. Packing list
8. Travel tips

The Travel Plan should be engaging, informative, and easy to follow. Use markdown formatting to make it visually appealing. Do not include any promotional content or affiliate links. Just provide the Travel Plan.`