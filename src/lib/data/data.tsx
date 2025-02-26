


export const links = [
    { name: "overview", hash: "#overview" },
    { name: "Programs", hash: "#Programs" },
    { name: "features", hash: "#features" },
    { name: "Pricing", hash: "#Pricing" },
    { name: "FAQ", hash: "#FAQ" },
    { name: "Help", hash: "#Help" },
    { name: "Signup", hash: "./Signup" },
] as const;

export const tabledata = [
    {
        metric: "Profit Target",
        phase1: "8%",
        phase2: "5%",
        phase3: "6%",
        funded: "-",
      },
      {
        metric: "Profit Split",
        phase1: "0",
        phase2: "0",
        phase3: "0",
        funded: "up to 100%",
      },
      {
        metric: "Max Drawdown",
        phase1: "10%",
        phase2: "10%",
        phase3: "10%",
        funded: "10%",
      },
      {
        metric: "Max Daily Drawdown",
        phase1: "5%",
        phase2: "5%",
        phase3: "5%",
        funded: "5%",
      },
      {
        metric: "Min. Trading Days",
        phase1: "0",
        phase2: "0",  
        phase3: "0",
        funded: "5 days/week",
      },
      {
        metric: "Max. Trading Days",
        phase1: "∞",
        phase2: "∞",
        phase3: "∞",
        funded: "5 days/week",
      },
      {
        metric: "Leverage",
        phase1: "1:100",
        phase2: "1:100",
        phase3: "1:100",
        funded: "1:100",
      },
] as const;

export const faqs = [
    {
      question: "What is PropTradeX?",
      answer: "PropTradeX is a proprietary trading firm that provides funding for traders to maximize their potential."
    },
    {
      question: "How fast are the payouts?",
      answer: "Payouts are processed within 24 hours of request approval, ensuring quick access to your funds."
    },
    {
      question: "What are the account types available?",
      answer: "We offer Standard and Aggressive accounts to suit different trading styles."
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we have a refund policy under specific conditions. Please check our terms and conditions for details."
    }
  ];
  