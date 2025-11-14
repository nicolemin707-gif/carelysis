export const user = {
  name: "Alex",
  profileImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9hzoG9tsGa_3AT4Kpk7Y_JgyPwbN5j3nyZHp25GgDZ2Fj2mlIhorRv1IrOUD7x7rAwLJhAhhfBRAo0n0DesCyC4zsTcdymarkpruZUpRAk5MKobZhZaNDn-staiD2KTWmzf8ThefibBhm5s759ePvZ0EFBcwqc8m9l0_XovpsrN4NABHln4b6WrL3pZk6BlV6Fk24yrg_8XCEsgHMc4SEVQTZvJQMDuUWh-p8YTgL_BHG392XG5qo6wJTWcmYuQPCBy35CbXXNEpq",
};

export const insight = {
  title: "Today's Insight",
  message: "Your sleep quality improved last night. Your heart rate is trending lower. Keep it up!",
};

export const vitals = [
  {
    label: "Heart Rate",
    value: "65 bpm",
    change: "-5%",
    changeType: "negative",
  },
  {
    label: "Sleep",
    value: "7h 45m",
    change: "+10%",
    changeType: "positive",
  },
  {
    label: "Blood Pressure",
    value: "118/78",
    unit: "mmHg",
  },
];

export const symptoms = [
  { name: "Headache", icon: "skull-outline" },
  { name: "Fatigue", icon: "emoticon-sad-outline" },
];

export const medications = [
  {
    name: "Vitamin D",
    time: "Morning",
    status: "Taken",
    icon: "white-balance-sunny",
  },
  {
    name: "Metformin",
    time: "Morning",
    status: "Due in 1h",
    icon: "pill",
  },
];
