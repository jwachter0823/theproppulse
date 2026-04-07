import { useState, useMemo } from "react";

// ─── LOGOS (base64 embedded) ────────────────────────────────────────────────
const LOGOS = {
  "Tradeify": "data:image/jpeg;base64,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",
  "My Funded Futures": "data:image/png;base64,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",
  "Alpha Futures": "data:image/png;base64,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",
  "Apex Trader Funding": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABAAEADASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAYBBAUHAv/EADIQAAAFAQUFBwQDAQAAAAAAAAABAgMEBQYREhUxEyFRYWIHFEFScYGhIiNCcpGx0dL/xAAaAQEAAgMBAAAAAAAAAAAAAAAAAQIEBQYH/8QAIxEAAgEDAwQDAAAAAAAAAAAAAAERAgMFBBMVEiFBUSIxsf/aAAwDAQACEQMRAD8AuZwfnBnHWEXNVcQZqriPQePRzWyPWcdYM46wi5qriDNVcQ49DZHrOOsGcdYRc1VxBmquIcehsj1nB+cGcdYRc1VxBmquIcehsmLtgbYUNtzGpZqlrr9ejU4lYW1qxPL8jZb1H/H9kNc8kkpk2ysnkkvGwb5MuGyR3G5gPCR+ug8bYdNT2s0mHWFUhuAg6A2gmELbTfpuM8GikctfHffcKlouz2DVo5VayMhk0Oli7sTn21/or8T6T+NBj0ZeqYrUF3p14OebYWYESbVJRRYEV2S8rRDSTUfvw9wwNWcs5Z1eK1laJ2SnedOgXqUXJSvD49Qx2atuqpVVmhWUokelQr8b7604lk2Wp3FuvPQrzPeYm5lqkvgp/ArC8ipXbGV2zlOan1FhtLLiiQezdJZtqPQlXaX3eF4X9sH3tetV3iSxQI6/oYMnpFx/mZfSn2I7/chzPbcxOnydyq3Nx9yK7KT7FLGfEakSrnTqNJjRTNMmd9t93TC0W/AX7HvPkRFxGV4iBy/U/ZmwaMSXAioJx2GqY/5HV4Wk+pJ3q/khs0ztDrtMmNuNrZ7qjd3JDSW2buRJLcfPX1CqAQ239g7KtyzfaRTsRlsZradSuJ5n/tPx6GPVDp8bs9s7PmyXUPvnepS0ldjItyEFfxM9/M+Q49FlyIUlEiK8tl1s70rQdxkNOsWrq1cjNx5r6TaQeLChBJJR8Tu1CXEAqT3Z8152pyiWo5LhrU4ZbjMzP4/wU8Z8RaXU5TkEoSnDNkriu5Fp/Ypieqr2IJ8RAnxECoAAkAAgAAAAAASAP//Z",
  "Top One Futures": "data:image/png;base64,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",
  "FundedNext Futures": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAABAGlDQ1BpY2MAABiVY2BgPMEABCwGDAy5eSVFQe5OChGRUQrsDxgYgRAMEpOLCxhwA6Cqb9cgai/r4lGHC3CmpBYnA+kPQKxSBLQcaKQIkC2SDmFrgNhJELYNiF1eUlACZAeA2EUhQc5AdgqQrZGOxE5CYicXFIHU9wDZNrk5pckIdzPwpOaFBgNpDiCWYShmCGJwZ3AC+R+iJH8RA4PFVwYG5gkIsaSZDAzbWxkYJG4hxFQWMDDwtzAwbDuPEEOESUFiUSJYiAWImdLSGBg+LWdg4I1kYBC+wMDAFQ0LCBxuUwC7zZ0hHwjTGXIYUoEingx5DMkMekCWEYMBgyGDGQCm1j8/yRb+6wAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB2lBMVEUAAAABAQEDAwMCAgIAAAIBAQIAAAEcHBybm5u0tLSvr6+wsLCurq68vLxGRkYsLCylpaWqqqoeHh4DAwQNDCJGQLRGQLVEPq5FP7FFP7JDPq0ICBbCwsL////8/Pz+/v77+/tgYGDd3d3Y2NgfHx8EBAUlIWBqYv9qYf9nX/5pYP9oYP5pYf9mXvoNDCEXFxfx8fFYWFgdHR36+vr5+fne3t4lJSUEBAYbGEViWfVjW/1gWPlhWftiWv1fV/UMCx/w8PDV1dUvLy80NDQzMzMyMjI5OTkJCQnk5OQrKysFBQgZF0FhWfJlXf9jW/9hWfgMCyAYGBjKysowMDD9/f3q6uoWFDlfV+1hWfnMzMwEBAQKCgoNDQ2NjY339/fv7+86OjoGBQgTEjJdVednXv/z8/Pf39/g4OBMTEwhISGzs7OTk5P4+PhBQUEQDypcVOVlXfwLCh2GhoZJSUkODSZWT9gPDibm5ubj4+NOTk4gICCysrIGBgZ7e3tRUVEFBQcHBxPNzc0HBwcMDAwPDw9ycnJZWVkFBQZoaGhhYWEFBQXLy8teXl5qampVVVVzc3Pt7e3IyMj29vZDQ0Py8vIQEBCnp6e7u7uxsbF8fHw8PDy3t7esrKwVFRVjf/IoAAAAAWJLR0Qd6wNxkQAAAAd0SU1FB+oDGBUoD34JRUQAAAG4SURBVEjH7dLnV9NQHMbxXxMUBJGpVOVJKspehUQRZFYBFVlSEAqUoQhoQNmjqCyVISAiU/hfuUkpHHpbD285p98XyblJPrlJbogCBbp8mQTRk2AiUWAbVtAVdxe6AxNX/Z+l4JBroWFG18NvUERkVDTFUOzNW3Fms/n2nbu8jYcEI9mCe5QA3H9AiZSUnJKalp6RmeUFTJRtZRfKshvk5EJR8fAR5dHj/IInhUXFJTwoRZnt6TO98orKCGZVPH9BL6nqVXVhTW0dB+pL8dozEqkBUOwqGsuZaHpTXdTMz1BvRYujtbVSr41sQFg7nOjopC7qfvuu2McMPXC+7zVKsPb1Ax/oIzT0DDAx+OnzkC8gn36lnGgd0DA02TnCxOjYuC+gTrib1KamARfN0BeoduUrfaOsWW7d2DvMzbctGC3q7+AiwUHfoUj2H/STWzUDnP9KLrZz0BIUC5ZpxSdYNX4fluABTPyCRcEamS42gy7WJUnFhrdgK/0bm2fAJiHUAEz0aXbLn2AvcfJI/Ay62PoLbZp7qO2d3fYz3r+3u++5xEEH/w6POPCfRD+HBdHf6PypQIEuS8dV7WBvcOmmpwAAAB50RVh0aWNjOmNvcHlyaWdodABHb29nbGUgSW5jLiAyMDE2rAszOAAAABR0RVh0aWNjOmRlc2NyaXB0aW9uAHNSR0K6kHMHAAAAAElFTkSuQmCC",
  "Lucid Trading": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABAAEADASIAAhEBAxEB/8QAHAAAAQQDAQAAAAAAAAAAAAAABQACBAYBAwcI/8QANBAAAgEDAgMECQIHAAAAAAAAAQIDAAQRBQYhMUESE1FhBxQiMlJxgZHBQuEVI0OCobHR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAIDAf/EABsRAAMBAQEBAQAAAAAAAAAAAAABAhEhMRNB/9oADAMBAAIRAxEAPwDz/SpV1r0Teitd0Aa5rSN/C0crBb5IN0w5knog5cOZ4dDQBRNvbL1/dDZ0vT5JIQcNO/sRL/ceH0GTVsf0RSWMYOqa/Z2744pFG0mPqcV2jd+qW+29OS0t2igCL2UhhUKqDwAHKuH6xuKe7lZmkJz508yn1iU2QLvY9lFkW+vwyN0EkBUH6gmq7f6He6cpeRFkhH9WJu0v18PrRGS/djxasQ6jLC2UcjoR40zmTFTK7Soxf2UU8DXdqoRl4yxLyx8S/kUHqbWDp6FNu6Sdd3BZaaGKrPIA7D9KDix+wNenU3Xp+3NK7m1RUjgiEUEY5IoGBXnr0fuINaubn9UVq5XyJIH+iaKavrMkqdkscDzrVOox1jJG6Nxy6tfSTPIT2jniap802SeNNmnLMTmozPmmFHM+awGNa81kcaNAnWk5hlDcx1HiKH30At7t0T3D7S/I1JizmlqydkQMeZUj7H96KXAl9Je1ZxFqU0ZOO+t3QfMYb8U+/cmQ8aCW1w9rcxzx+9GwYUdvFWYLPFxikHaXy8qI6sCuPQUeJphFbmQgmmdk0YAwLmtqR5p6RZqfa2jORwplJjeGm2t2eRVA4k1ncsXq89tbn31j7TDwyf2q36RoqwJJqF5/KtLde8kkboB4eZ6VQdVv31TVLi8cY7xsqvwryA+1F8WBHXpCqdYX/q2YpQXgY5IHNT4ioNKpJ54Ua0svqkc8fewOsiHqPz4VpNk4PumgkM8tu/bhkZG8VOKJxbivolwwhk83T/mKqrn9JuKXgTs9NeSQAqRVvs9JsdPtxealcx29uvEs/XyA5k+QqhHdeogERC3iPxLHk/5zQu7vrq/l726uJJn6F2zj5eFb9ZS4L86fpbN675O4YoNL06D1XSbY5VcYedvjf8Dp86pdKlUW9LJYf//Z",
  "Topstep": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAAAAAByaaZbAAAAAmJLR0QA/4ePzL8AAAAHdElNRQfqAxgVKA4JDnXSAAAAy0lEQVRIx+1RuwrCQBCcvT0LRUHs8y0WfkC+xt8T/AzrlKKNBEV2by2MSnKHiSLY3HDNPoaZ2QMy+kFRw7XKYD9WICtW11fPRpuK3mowSpNgDYJYCd/e8F2KQPhZKEt3HhEI7B6eLHEUFxOIgOZF6ylLeiKeGmBUi82050rAeGFhvC0C3GG593Q805Cf2JmqVZPUKMoAokaWGC4OEWWAAXcTZghDFHqQCZmQCf8nKESgyZFPdhke8DScsJ4rXH351G4SSVlwkyTjS9wAPilBA09/KDMAAAAedEVYdGljYzpjb3B5cmlnaHQAR29vZ2xlIEluYy4gMjAxNqwLMzgAAAAUdEVYdGljYzpkZXNjcmlwdGlvbgBzUkdCupBzBwAAAABJRU5ErkJggg==",
  "Take Profit Trader": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABAAEADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAECAwYEBQf/xAAsEAACAQMEAQIFBAMAAAAAAAABAgMABBEFEiExExQiBjNBYaEjMlGBQnGR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEDAv/EABcRAQEBAQAAAAAAAAAAAAAAAAARAQL/2gAMAwEAAhEDEQA/APktSVS3VIDJxU2YKMLWrMwqL3yaPKo6H4quilRb5VPY/FGxH/bwaqAqQ4pQmQoeajXQpDja1UuhRsH+jTcMAOF/3Sq22dEuYzLCkybgGRyQCOuwQfzWhl0rSpjqKq1tbSvNLFYRi4Y/LJ93JOd5wvJAzkipXUZmmBWtTRNGOo20cBS6jfJnHkbMTeAuiYyC2Wycg9jaMfW23074cg0u5uNXjjt5PVPEqh5llCCEMvjQFhksf8zj71KRjwKkFrePoHwuRZK0kCEvAknhvGyzNbmQrKX9qbpNqhlyBk5wRVaaR8PwRyT6nbQWVwll5ZbI3UkqQv5lRT7G3nchJ25OMZ6NW4nOsR1RL7kz9RWmMWjwtYgadbXAubLzyM91KojbfIMAK2elXg8/9rO3ksMt1K0EC28RbCxqzMFHXbEn78mrm0kcoFMKP4oXmrAKYOm2FgYokuYvd6hfIwLfK+vHWfzVzx6Ri7MTyISi+mAQ43Yy27+BngDnvNcNFWJXqKmiephDH9La2/G/Gdg254yDuznHGMVyuNOXTQIwReCQ8AHbtyf66x9+e/pXGTUSainnByOD9qiTRmlQAODmrVIIzVNMEjqmaLc0iajupZpUBNKilUUUUUUH/9k=",
  "Bulenox": "data:image/jpeg;base64,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",
};

// ─── DATA ───────────────────────────────────────────────────────────────────
const FIRMS = [
  { id:1, name:"Tradeify", initials:"T", logoUrl:"https://www.google.com/s2/favicons?domain=tradeify.co&sz=128", founded:2021, rating:4.7, reviews:2437, pulse:94, trend:"up", maxAlloc:"$750K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","Rithmic","TradeSea"], challenge:"Straight to Funded", steps:0, split:"80/20 → 90/10", target:"N/A", dailyDD:"$2,250", maxDD:"$3,500", minPayout:"$250", paySpeed:"1–3 days", reset:"$99", hq:"Austin, TX", color:"#0ea5e9", brandGrad:"linear-gradient(135deg,#0ea5e9,#0284c7)", desc:"Fast-growing futures prop firm with their signature Straight-to-Funded model. No evaluation required — get funded immediately and start trading. Known for rapid payouts and trader-friendly drawdown rules.", instantFund:true, sizes:["25K","50K","100K","150K"], payoutType:"Daily / 5-Day / Per Goal", minDaysPass:"1 day (Lightning) / 3 (Select)", drawdownType:"EOD Trailing", hasDLL:false, hasConsistency:true, consistencyPct:"20–40%", newsTrading:true, eaAllowed:true },
  { id:2, name:"My Funded Futures", initials:"MFF", logoUrl:"https://www.google.com/s2/favicons?domain=myfundedfutures.com&sz=128", founded:2023, rating:4.9, reviews:16890, pulse:91, trend:"up", maxAlloc:"$450K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","Rithmic","+4"], challenge:"1-Step Eval", steps:1, split:"80/20 → 90/10", target:"$5,000", dailyDD:"$1,250", maxDD:"$2,500", minPayout:"$250", paySpeed:"1–3 days", reset:"$99", hq:"Dallas, TX", color:"#a855f7", brandGrad:"linear-gradient(135deg,#a855f7,#7c3aed)", desc:"Simplicity and transparency are the name of the game. Straightforward rules, quick payouts, and a rapidly growing community of funded traders.", instantFund:false, sizes:["50K","100K","150K"], payoutType:"Daily (Rapid) / Bi-Weekly", minDaysPass:"1 day", drawdownType:"EOD / Intraday", hasDLL:false, hasConsistency:true, consistencyPct:"40% (Core)", newsTrading:true, eaAllowed:true },
  { id:3, name:"Alpha Futures", initials:"AF", logoUrl:"https://www.google.com/s2/favicons?domain=alphafutures.io&sz=128", founded:2023, rating:4.9, reviews:3320, pulse:88, trend:"up", maxAlloc:"$500K", country:"GB", flag:"🇬🇧", platforms:["NinjaTrader","Tradovate","TradingView"], challenge:"1-Step Eval", steps:1, split:"100% first $15K → 90/10", target:"$5,000", dailyDD:"$1,500", maxDD:"$3,000", minPayout:"$250", paySpeed:"1–3 days", reset:"$85", hq:"London, UK", color:"#8b5cf6", brandGrad:"linear-gradient(135deg,#8b5cf6,#6d28d9)", desc:"UK-based futures prop firm with generous first-payout rules. 100% profit on your first $15K with only 3 minimum trading days required.", instantFund:false, sizes:["50K","100K","150K"], payoutType:"Bi-Weekly", minDaysPass:"1–2 days", drawdownType:"EOD Trailing", hasDLL:false, hasConsistency:true, consistencyPct:"50% (Eval)", newsTrading:true, eaAllowed:false },
  { id:4, name:"Apex Trader Funding", initials:"ATF", logoUrl:"https://www.google.com/s2/favicons?domain=apextraderfunding.com&sz=128", founded:2021, rating:4.4, reviews:17860, pulse:82, trend:"flat", maxAlloc:"$3M", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Rithmic","Tradovate","+11"], challenge:"1-Step Eval", steps:1, split:"100% first $25K → 90/10", target:"$6,000", dailyDD:"None", maxDD:"$2,500", minPayout:"$500", paySpeed:"3–5 days", reset:"$80", hq:"Austin, TX", color:"#f97316", brandGrad:"linear-gradient(135deg,#f97316,#ea580c)", desc:"The largest futures prop firm by volume with the highest max allocation in the industry at $3M. Aggressive promos, simple rules, and no daily drawdown limit.", instantFund:false, sizes:["25K","50K","75K","100K","150K","250K","300K"], payoutType:"After 5 Trading Days", minDaysPass:"1 day", drawdownType:"EOD / Intraday", hasDLL:false, hasConsistency:true, consistencyPct:"50%", newsTrading:true, eaAllowed:true },
  { id:5, name:"Top One Futures", initials:"T1", logoUrl:"https://www.google.com/s2/favicons?domain=toponefutures.com&sz=128", founded:2024, rating:4.7, reviews:3041, pulse:87, trend:"up", maxAlloc:"$2.6M", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","TradingView"], challenge:"1-Step Eval", steps:1, split:"90/10", target:"$5,000", dailyDD:"$1,500", maxDD:"$2,500", minPayout:"$300", paySpeed:"1–3 days", reset:"$90", hq:"Miami, FL", color:"#10b981", brandGrad:"linear-gradient(135deg,#10b981,#059669)", desc:"Rapidly growing with one of the highest max allocations in futures. Competitive rules and a strong trader community.", instantFund:true, sizes:["25K","50K","100K","150K"], payoutType:"Varies by Plan", minDaysPass:"1 day", drawdownType:"EOD Trailing", hasDLL:true, hasConsistency:true, consistencyPct:"Varies", newsTrading:true, eaAllowed:true },
  { id:6, name:"FundedNext Futures", initials:"FN", logoUrl:"https://www.google.com/s2/favicons?domain=fundednext.com&sz=128", founded:2022, rating:4.4, reviews:63192, pulse:79, trend:"flat", maxAlloc:"$700K", country:"AE", flag:"🇦🇪", platforms:["NinjaTrader","Tradovate","TradingView"], challenge:"1-Step Eval", steps:1, split:"80/20 → 90/10", target:"$5,000", dailyDD:"$1,200", maxDD:"$2,500", minPayout:"$500", paySpeed:"3–5 days", reset:"$95", hq:"Dubai, UAE", color:"#06b6d4", brandGrad:"linear-gradient(135deg,#06b6d4,#0891b2)", desc:"Part of the FundedNext ecosystem, now offering futures. Backed by one of the most recognized brands in prop trading.", instantFund:false, sizes:["50K","100K","150K","200K"], payoutType:"Within 24 Hours", minDaysPass:"No minimum", drawdownType:"EOD Trailing", hasDLL:true, hasConsistency:false, consistencyPct:"None", newsTrading:true, eaAllowed:true },
  { id:7, name:"Lucid Trading", initials:"LT", logoUrl:"https://www.google.com/s2/favicons?domain=lucidtrading.com&sz=128", founded:2024, rating:4.8, reviews:2710, pulse:72, trend:"new", maxAlloc:"$750K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","Bookmap","+8"], challenge:"1-Step Eval", steps:1, split:"80/20 → 90/10", target:"$4,000", dailyDD:"$1,000", maxDD:"$2,000", minPayout:"$500", paySpeed:"3–5 days", reset:"$75", hq:"New York, NY", color:"#14b8a6", brandGrad:"linear-gradient(135deg,#14b8a6,#0d9488)", desc:"The newest entrant in the futures prop space. Building their reputation through competitive pricing and transparent operations.", instantFund:true, sizes:["25K","50K","100K","150K"], payoutType:"5-Day (Pro) / 8-Day (Direct)", minDaysPass:"1 day", drawdownType:"EOD Trailing", hasDLL:false, hasConsistency:false, consistencyPct:"None (Flex)", newsTrading:true, eaAllowed:true },
  { id:8, name:"Topstep", initials:"TS", logoUrl:"https://www.google.com/s2/favicons?domain=topstep.com&sz=128", founded:2012, rating:3.4, reviews:13746, pulse:85, trend:"flat", maxAlloc:"$750K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader"], challenge:"Trading Combine", steps:1, split:"100% first $10K → 90/10", target:"$6,000", dailyDD:"$1,000", maxDD:"$2,000", minPayout:"$200", paySpeed:"3–7 days", reset:"$149", hq:"Chicago, IL", color:"#6366f1", brandGrad:"linear-gradient(135deg,#6366f1,#4f46e5)", desc:"The original futures prop firm, operating since 2012. Pioneered the evaluation model that the entire industry now follows. Trusted and established.", instantFund:false, sizes:["50K","100K","150K"], payoutType:"After Combine Pass", minDaysPass:"No minimum", drawdownType:"EOD Trailing", hasDLL:true, hasConsistency:true, consistencyPct:"50%", newsTrading:true, eaAllowed:false },
  { id:9, name:"Take Profit Trader", initials:"TPT", logoUrl:"https://www.google.com/s2/favicons?domain=takeprofittrader.com&sz=128", founded:2022, rating:4.4, reviews:8801, pulse:74, trend:"down", maxAlloc:"$750K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","+10"], challenge:"1-Step Eval", steps:1, split:"80/20 → 90/10", target:"$5,000", dailyDD:"$1,100", maxDD:"$2,500", minPayout:"$200", paySpeed:"1–3 days", reset:"$99", hq:"Orlando, FL", color:"#eab308", brandGrad:"linear-gradient(135deg,#eab308,#ca8a04)", desc:"Known for fast payouts and transparent rules. Active community with frequent promotional events and competitive pricing.", instantFund:false, sizes:["25K","50K","75K","100K","150K"], payoutType:"Daily (PRO+)", minDaysPass:"No minimum", drawdownType:"EOD Trailing", hasDLL:true, hasConsistency:true, consistencyPct:"40%", newsTrading:true, eaAllowed:true },
  { id:10, name:"Bulenox", initials:"BX", logoUrl:"https://www.google.com/s2/favicons?domain=bulenox.com&sz=128", founded:2022, rating:4.6, reviews:1400, pulse:81, trend:"up", maxAlloc:"$450K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","Bookmap","+1"], challenge:"1-Step Eval", steps:1, split:"90/10", target:"$4,500", dailyDD:"$1,500", maxDD:"$2,500", minPayout:"$500", paySpeed:"1–5 days", reset:"$75", hq:"Wilmington, DE", color:"#ec4899", brandGrad:"linear-gradient(135deg,#ec4899,#db2777)", desc:"Competitive pricing with the lowest reset fees in the industry. Generous drawdown rules and scaling plans up to $450K.", instantFund:false, sizes:["25K","50K","100K","150K","250K"], payoutType:"Weekly", minDaysPass:"No minimum", drawdownType:"EOD / Trailing (Choose)", hasDLL:true, hasConsistency:true, consistencyPct:"40%", newsTrading:true, eaAllowed:true },
];

const DEALS = [
  { firm:"Tradeify", pct:"40% OFF", code:"PULSE", color:"#0ea5e9", desc:"40% off all accounts (up to 5 uses) then 30% off on subsequent purchases", tag:"NEW OFFER", expires:"May 1" },
  { firm:"Apex Trader Funding", pct:"90% OFF", code:"PULSE", color:"#f97316", desc:"90% off all evaluations", tag:"NEW OFFER", expires:"Apr 10" },
  { firm:"My Funded Futures", pct:"50% OFF", code:"PULSE", color:"#a855f7", desc:"50% off all Pro accounts for new users", tag:"", expires:"" },
  { firm:"Top One Futures", pct:"60% OFF", code:"PULSE", color:"#10b981", desc:"60% off all evaluation and instant funding accounts", tag:"", expires:"" },
  { firm:"Lucid Trading", pct:"50% OFF", code:"PULSE", color:"#14b8a6", desc:"50% off on Flex & Pro accounts (First 2 orders)", tag:"NEW OFFER", expires:"Apr 4" },
  { firm:"Take Profit Trader", pct:"40% OFF", code:"PULSE", color:"#eab308", desc:"40% off all evaluation account sizes", tag:"", expires:"" },
  { firm:"Alpha Futures", pct:"15% OFF", code:"PULSE", color:"#8b5cf6", desc:"15% off all evaluations", tag:"", expires:"" },
  { firm:"FundedNext Futures", pct:"30% OFF", code:"PULSE", color:"#06b6d4", desc:"30% off all futures challenge accounts", tag:"", expires:"" },
  { firm:"Bulenox", pct:"75% OFF", code:"PULSE", color:"#3b82f6", desc:"75% off all evaluation accounts", tag:"HOT", expires:"" },
  { firm:"Topstep", pct:"50% OFF", code:"PULSE", color:"#64748b", desc:"50% off Trading Combine — first month only", tag:"", expires:"" },
];

const REVIEWS = [
  { id:1, user:"TradingMike_NQ", firm:"Tradeify", rating:5, text:"Got funded in 3 days and received my first payout within 48 hours. The straight-to-funded model is a game changer.", date:"Mar 20, 2026", verified:true },
  { id:2, user:"FuturesJenny", firm:"Apex Trader Funding", rating:4, text:"Great promos and easy rules. Payout took a bit longer than expected but the 100% profit on first $25K is hard to beat.", date:"Mar 19, 2026", verified:true },
  { id:3, user:"NQ_Scalper_Pro", firm:"Topstep", rating:4, text:"Been with Topstep for years. Reliable, consistent, and the Trading Combine is fair. Not the cheapest but solid.", date:"Mar 17, 2026", verified:true },
  { id:4, user:"ChicagoTraderX", firm:"My Funded Futures", rating:5, text:"MFF is underrated. Clean interface, fast payouts, and their support team actually responds.", date:"Mar 15, 2026", verified:true },
  { id:5, user:"DeltaFlow", firm:"Bulenox", rating:4, text:"Solid firm with good pricing. Reset fees are the lowest I've seen. Minor UI issues on dashboard but overall great.", date:"Mar 12, 2026", verified:true },
  { id:6, user:"ESMiniTrader", firm:"Alpha Futures", rating:5, text:"New firm but already impressing. 100% first $15K payout and only 3 minimum trading days.", date:"Mar 10, 2026", verified:true },
];

const BLOG = [
  { id:1, title:"The State of Futures Prop Firms in 2026", date:"Mar 22, 2026", cat:"Industry", time:"6 min", color:"#a855f7",
    excerpt:"The futures prop firm landscape has shifted dramatically. Here's where the industry stands heading into Q2 2026.",
    body:`The futures prop trading industry in 2026 looks nothing like it did two years ago. The market has matured, consolidated, and split into clear tiers — and if you're choosing a firm today, the decision matters more than ever.

**The Big Shift: One-Time Fees vs Subscriptions**

The most significant industry trend is the migration from monthly subscriptions to one-time evaluation fees. Firms like Lucid Trading, FundedNext Futures, Apex Trader Funding, and Bulenox now charge a single payment with no recurring costs. This fundamentally changes the economics for traders — you're no longer bleeding $150/month while trying to pass. Tradeify and My Funded Futures still run subscription models on their standard plans, though Tradeify's Lightning Funded offers a one-time payment alternative.

**EOD Drawdown Is Now Standard**

Two years ago, intraday trailing drawdown was common. In 2026, End-of-Day trailing drawdown has become the industry standard. Every major firm we track uses EOD on their primary accounts. This matters because EOD drawdown only updates at market close — a midday dip that recovers by 4:00 PM doesn't count against you. The exception: MFFU's Rapid plan still uses intraday trailing, which is the tradeoff for getting daily payouts.

**Payout Speed Is the New Battleground**

Firms are competing aggressively on payout speed. Lucid Trading processes payouts in an average of 15 minutes. Tradeify handles most within 24 hours, often same-day. My Funded Futures approves most instantly. Compare that to 2024, when 3-5 business days was considered fast. The bar has been raised permanently.

**The Consistency Rule Spectrum**

Consistency rules vary wildly: FundedNext has none. Lucid Flex has none on funded accounts. Tradeify Select sits at 40%. Topstep and Apex are at 50%. Top One Futures has the strictest at 30%. Understanding where your trading style falls on this spectrum is crucial before choosing a firm.

**What to Watch for Q2 2026**

Live capital transitions are becoming more common. Tradeify Elite, Lucid LucidLive, and Topstep's Express Funded all offer paths to real CME capital. This is the future — sim-funded as a proving ground, live capital as the destination. Expect more firms to build this path in the coming months.`},

  { id:2, title:"Apex vs Tradeify: Which Futures Prop Firm Is Right For You?", date:"Mar 18, 2026", cat:"Comparison", time:"8 min", color:"#0ea5e9",
    excerpt:"Two of the biggest names in futures funding compared side-by-side on rules, fees, payouts, and who each firm is best for.",
    body:`Apex Trader Funding and Tradeify are two of the most popular futures prop firms, but they're built for different traders. Here's a no-nonsense comparison based on actual rules and data.

**Pricing & Fee Structure**

Apex underwent a major overhaul in March 2026, moving to one-time fees. A 50K account costs $167 plus a $130-$160 activation fee, totaling roughly $297-$327. Tradeify Select runs $159/month (subscription) with zero activation fee. Tradeify Lightning (instant funding) is $349 one-time for 50K. If you pass Tradeify Select in one month, you've spent $159 total. If it takes two months, that's $318. Apex's one-time model caps your cost, while Tradeify's subscription is cheaper if you're fast but more expensive if you're not.

**Profit Split**

Apex wins on paper: 100% of your first $25,000, then 90/10. That's hard to beat for the initial payout phase. Tradeify's Select Flex offers 90/10 from day one with no 100% phase, but you keep a consistent split without the step-down. For traders who plan to withdraw steadily over months, the difference narrows significantly.

**Drawdown Rules**

Both offer EOD trailing drawdown. Tradeify's drawdown locks at starting balance + $100 once your EOD balance exceeds the drawdown amount — meaning your floor stops moving relatively early. Apex's EOD drawdown trails with your highest EOD balance and doesn't lock the same way. This is a meaningful advantage for Tradeify.

**Daily Loss Limits**

Neither firm has a daily loss limit on their primary plans. Tradeify Select Flex has no DLL. Apex removed DLL in their March 2026 update. Both firms give you full freedom to manage risk your way.

**Consistency Rules**

Apex: 50% on funded accounts (loosened from 30% in the March update). Tradeify Select: 40% on evaluation, no consistency on funded Select Flex accounts. This is a significant difference — Tradeify funded traders have no consistency constraint, while Apex funded traders still need to spread their profits across multiple days.

**Who Should Choose What?**

Choose Apex if: You want the largest possible account sizes (up to $300K), you want 100% profit on your first $25K, or you want to run up to 20 accounts simultaneously.

Choose Tradeify if: You value drawdown locking, want no funded consistency rule (Select Flex), prefer daily payout options (Select Daily), or want instant funding without evaluation (Lightning).`},

  { id:3, title:"How to Stack Multiple Prop Firm Accounts for Maximum Payouts", date:"Mar 14, 2026", cat:"Strategy", time:"5 min", color:"#ec4899",
    excerpt:"Running multiple funded accounts across different firms is how serious traders maximize income. Here's the playbook.",
    body:`Most profitable prop firm traders don't rely on a single account. They stack multiple funded accounts across different firms to maximize payout potential while diversifying risk. Here's how to do it effectively.

**Why Stack Accounts?**

The math is simple: each funded account has payout caps and withdrawal limits. A single 50K account at most firms caps you at $1,000-$3,000 per payout cycle. But five 50K accounts across different firms? That's $5,000-$15,000 per cycle from the same trading strategy. The key is that you're not increasing your per-trade risk — you're multiplying the payout surface area.

**The Diversification Strategy**

Don't put all your accounts at one firm. Spread across 2-3 firms to protect against rule changes, platform outages, or payout delays at any single firm. A solid stack for 2026 might look like: 2x Tradeify Select Flex 50K (no DLL, no funded consistency), 2x Lucid Flex 50K (no DLL, fastest payouts), and 1x Bulenox 50K (weekly payouts, different payout day). This gives you different payout schedules, different firms' infrastructure, and different rule sets that hedge each other.

**Managing Risk Across Accounts**

The #1 mistake in multi-account trading: sizing as if each account is independent. If you're trading the same instrument (say NQ) across 5 accounts, a gap against you hits all 5. Treat your total exposure as one position. If your normal size is 2 contracts on a single 50K, consider running 1 contract each on 5 accounts rather than 2 contracts on each.

**Payout Timing Optimization**

Stagger your payout requests. If all 5 accounts hit their targets the same week, don't request all 5 on Monday. Spread them across the week so you have consistent cash flow. Some firms process faster on certain days — Bulenox does Wednesdays, Lucid is anytime, Tradeify is 24-48 hours. Use these differences to your advantage.

**Cost Management**

Track your total evaluation spend as a business expense. If you're spending $500-800/month on evaluations across firms, that's your cost of capital. The goal: generate more in payouts per month than you spend on evaluations. Most profitable stackers hit this breakeven within 2-3 months and then it's pure profit from there.`},

  { id:4, title:"March 2026 Prop Firm Rule Changes: Everything You Need to Know", date:"Mar 10, 2026", cat:"News", time:"4 min", color:"#10b981",
    excerpt:"Apex's massive overhaul, Lucid's February updates, and Tradeify's Select launch — every rule change that matters.",
    body:`Several major firms made significant rule changes in early 2026. Here's what happened and how it affects your trading.

**Apex Trader Funding — March 2026 Overhaul**

Apex essentially rebuilt their product. Monthly recurring fees are gone, replaced with one-time payments. The MAE (Maximum Adverse Excursion) rule that punished traders for drawdown during winning trades has been eliminated. The 5/1 risk-reward restriction is gone. No more payout denials requiring video reviews or chart screenshots. The consistency rule loosened from 30% to 50%. However, accounts now close after 6 payouts and must be restarted. This is a fundamental shift from "keep trading forever" to a more structured cycle.

**Lucid Trading — February 2026 Updates**

LucidBlack was discontinued and merged into an upgraded LucidPro with 3-day payout cycles. LucidDirect removed the 8-day minimum trading requirement — you can now request payouts as fast as you hit the profit target. A new 100K Direct account was added ($799). LucidLive was completely rebuilt: the old escrow system is gone, replaced with a $0 start plus one-time bonus model. LucidMaxx launched as an invite-only tier for proven traders with daily payouts, no caps, and live capital.

**Tradeify — Select Plan Launch**

Tradeify's Select plan (launched late 2025) is now their flagship product. The key innovation: you pass one evaluation and then choose between two funded paths — Select Flex (5-day payouts, no DLL) or Select Daily (daily payouts with DLL). This "evaluate first, commit later" approach is unique in the industry. They've also confirmed over $150M in total payouts processed.

**My Funded Futures — Rapid Plan Update**

MFFU upgraded the Rapid plan profit split from 80/20 to 90/10 effective January 12, 2026. This makes Rapid directly competitive with Tradeify Select Daily for daily payout seekers, though Rapid uses intraday trailing drawdown (more aggressive) vs Tradeify's EOD trailing.

**The Takeaway**

The trend is clear: firms are removing restrictive rules, moving to one-time fees, and competing on payout speed and flexibility. Traders have more power than ever. Use it wisely — compare the rules that matter for YOUR strategy, not just the marketing headlines.`},

  { id:5, title:"Best Futures Prop Firms for NQ Scalpers in 2026", date:"Mar 6, 2026", cat:"Guide", time:"7 min", color:"#f97316",
    excerpt:"If you scalp NQ (Micro or Mini Nasdaq futures), not all prop firms are created equal. Here's which ones actually fit.",
    body:`Scalping NQ futures is one of the most popular strategies in prop trading, but the firm you choose can make or break your results. NQ moves fast — 20-50+ points in minutes during the US session — and your firm's rules need to support that volatility.

**Why NQ Scalpers Need Specific Rules**

NQ is volatile. A 30-point adverse move on 1 MNQ contract is $600. On 1 NQ mini, it's $600. Scalpers often see 10-20 point drawdowns before their trades work. This means: tight daily loss limits will kill you, intraday trailing drawdown is dangerous, and consistency rules punish the "one big winner" pattern that scalpers naturally produce.

**Top Picks for NQ Scalpers**

1. **Lucid Trading — LucidFlex** (Pulse Score: 97)
Why: Zero daily loss limit, zero funded consistency rule, EOD trailing drawdown. This is the most scalper-friendly rule set in the industry. Start with a 50K account ($99 one-time), scale up as your equity grows. The 2-mini starting limit on Flex is the main constraint — you need to build $1,000+ in profit before unlocking 3 minis.

2. **Tradeify — Select Flex** (Pulse Score: 98)
Why: No DLL on Flex, EOD trailing drawdown that locks early (at balance + $100). The 40% consistency rule during evaluation requires 3+ days to pass, but once funded, Select Flex has no consistency rule. The drawdown lock is a huge advantage for scalpers — once it locks, your floor is fixed.

3. **My Funded Futures — Core** (Pulse Score: 94)
Why: No DLL, static drawdown on funded accounts (locks and never moves up again). The 40% consistency rule applies on funded, so you can't rely solely on one monster day per cycle. The $77/month for a 50K is the cheapest subscription entry for this quality of rules.

4. **Apex Trader Funding — EOD** (Pulse Score: 89)
Why: No DLL, 100% of first $25K. The 50% consistency rule is more forgiving post-March 2026. Best for scalpers who produce consistent daily results rather than one big winner. The ability to run up to 20 accounts simultaneously is unmatched.

**Firms to Avoid for NQ Scalping**

Alpha Futures: Prohibits EAs/bots entirely. If you use any automation in your scalping workflow, this is a non-starter. The soft DLL is better than a hard breach, but still limits aggressive scalping sessions.

Top One Futures: 30% consistency rule is the strictest in the industry. For NQ scalpers who naturally produce 1-2 big winning days per week, this rule will deny payouts consistently.

**The Bottom Line**

For pure NQ scalping, Lucid Flex + Tradeify Select Flex is the ideal combination. Both have no DLL, both use EOD drawdown, and together they give you diversified payout schedules with the most lenient funded rules available.`},

  { id:6, title:"EOD vs Intraday Trailing Drawdown: Why It's the Most Important Rule", date:"Mar 2, 2026", cat:"Education", time:"5 min", color:"#eab308",
    excerpt:"This single rule difference is responsible for more blown accounts than any other factor in prop trading.",
    body:`If you only understand one thing about prop firm rules, make it this: the difference between End-of-Day (EOD) and Intraday Trailing drawdown. It's the #1 reason traders blow funded accounts.

**How Intraday Trailing Drawdown Works**

Your drawdown limit moves UP in real-time as your unrealized profit grows — and it never moves back down. Example on a 50K account with $2,000 drawdown: you enter a trade that goes +$1,000 unrealized. Your drawdown floor has now moved from $48,000 to $49,000 permanently. If the trade reverses and you close at breakeven, you've just lost $1,000 of drawdown room without losing any actual money. Do this 2-3 times in a session and you've effectively eliminated your entire drawdown buffer.

**How End-of-Day (EOD) Trailing Drawdown Works**

Your drawdown limit only updates once per day based on your CLOSING balance. That same trade scenario — up $1,000 intraday, close at breakeven — changes nothing. Your drawdown floor stays at $48,000 because your end-of-day balance didn't change. You could go up $3,000 intraday, give back $2,500, close up $500, and your drawdown only trails by $500. The intraday fluctuations are invisible to EOD drawdown.

**Why This Matters for Real Trading**

In live NQ or ES trading, it's completely normal to see 10-20+ point adverse excursions before your trade works. On a 2-contract NQ position, a 15-point pullback is $600 of unrealized drawdown. With intraday trailing, that $600 is permanently consumed even if you end up profitable. With EOD, it doesn't matter unless you close the day at a loss.

**Which Firms Use Which**

EOD Trailing (better for most traders): Tradeify (all plans), Lucid (all plans), Alpha Futures, Top One Futures, FundedNext, Topstep, Bulenox (EOD option), Take Profit Trader, Apex (EOD option).

Intraday Trailing (more aggressive): MFFU Rapid (the tradeoff for daily payouts), Apex (intraday option), Bulenox (trailing option).

**The Drawdown Lock: The Best Feature No One Talks About**

Several firms now offer drawdown locking. On Tradeify, once your EOD balance exceeds the drawdown by $100, the floor locks at starting balance + $100 and NEVER moves again. On MFFU funded accounts, the drawdown becomes static. This effectively turns a trailing drawdown into a fixed floor, giving you unlimited upside with a known worst-case floor. This is arguably the single most trader-friendly rule innovation in prop trading.

**Bottom Line**

Always choose EOD trailing drawdown unless you have a specific reason not to (like MFFU Rapid's daily payouts). The difference in account survival rate is massive, and it's the one rule that protects you from normal market volatility that has nothing to do with your trading skill.`},
];


// ─── CHALLENGES (per account size, per firm) ────────────────────────────────
const CHALLENGES = [
  // TRADEIFY
    {firm:"Tradeify",plan:"Select",size:"25K",target:"$1,500",maxLoss:"$1,000",dll:"None (Flex)",drawdown:"EOD Trailing",minDays:"3 days",consistency:"40%",split:"90/10",payout:"Daily or 5-Day",standard:true,instant:false,news:true,ea:true,price:"$109 one-time"},
  {firm:"Tradeify",plan:"Growth",size:"25K",target:"$1,500",maxLoss:"$1,000",dll:"$600",drawdown:"EOD Trailing",minDays:"1 day",consistency:"35% (funded)",split:"100% first $15K",payout:"Per Profit Goal",standard:false,instant:false,news:true,ea:true,price:"$99 one-time"},
{firm:"Tradeify",plan:"Select",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"None (Flex)",drawdown:"EOD Trailing",minDays:"3 days",consistency:"40%",split:"90/10",payout:"Daily or 5-Day",standard:true,instant:false,news:true,ea:true,price:"$159 one-time"},
  {firm:"Tradeify",plan:"Select",size:"100K",target:"$6,000",maxLoss:"$3,500",dll:"None (Flex)",drawdown:"EOD Trailing",minDays:"3 days",consistency:"40%",split:"90/10",payout:"Daily or 5-Day",standard:true,instant:false,news:true,ea:true,price:"$259 one-time"},
  {firm:"Tradeify",plan:"Select",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"None (Flex)",drawdown:"EOD Trailing",minDays:"3 days",consistency:"40%",split:"90/10",payout:"Daily or 5-Day",standard:true,instant:false,news:true,ea:true,price:"$359 one-time"},
  {firm:"Tradeify",plan:"Lightning",size:"50K",target:"N/A (Instant)",maxLoss:"$2,000",dll:"$1,250",drawdown:"EOD Trailing",minDays:"None",consistency:"20%",split:"90/10",payout:"Per Profit Goal",standard:false,instant:true,news:true,ea:true,price:"$349 one-time"},
  {firm:"Tradeify",plan:"Lightning",size:"100K",target:"N/A (Instant)",maxLoss:"$3,500",dll:"$2,500",drawdown:"EOD Trailing",minDays:"None",consistency:"20%",split:"90/10",payout:"Per Profit Goal",standard:false,instant:true,news:true,ea:true,price:"$509 one-time"},
  {firm:"Tradeify",plan:"Lightning",size:"150K",target:"N/A (Instant)",maxLoss:"$5,250",dll:"$3,000",drawdown:"EOD Trailing",minDays:"None",consistency:"20%",split:"90/10",payout:"Per Profit Goal",standard:false,instant:true,news:true,ea:true,price:"$729 one-time"},
  // MY FUNDED FUTURES
  {firm:"My Funded Futures",plan:"Core",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"None",drawdown:"EOD Trailing",minDays:"2 days",consistency:"50% (eval) / 40% (funded)",split:"80/20",payout:"5 Winning Days",standard:true,instant:false,news:false,ea:true,price:"$77/mo"},
  
  
  {firm:"My Funded Futures",plan:"Rapid",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"None",drawdown:"Intraday Trailing",minDays:"2 days",consistency:"None",split:"90/10",payout:"Daily",standard:false,instant:false,news:false,ea:true,price:"$129/mo"},
  {firm:"My Funded Futures",plan:"Rapid",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"None",drawdown:"Intraday Trailing",minDays:"2 days",consistency:"None",split:"90/10",payout:"Daily",standard:false,instant:false,news:false,ea:true,price:"$199/mo"},
  {firm:"My Funded Futures",plan:"Rapid",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"None",drawdown:"Intraday Trailing",minDays:"2 days",consistency:"None",split:"90/10",payout:"Daily",standard:false,instant:false,news:false,ea:true,price:"$249/mo"},
  // ALPHA FUTURES
  {firm:"Alpha Futures",plan:"Standard",size:"50K",target:"$3,000",maxLoss:"$2,500",dll:"Soft Guard",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Eval)",split:"70→80→90%",payout:"Bi-Weekly",standard:true,instant:false,news:true,ea:false,price:"$79/mo"},
  {firm:"Alpha Futures",plan:"Standard",size:"100K",target:"$6,000",maxLoss:"$3,500",dll:"Soft Guard",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Eval)",split:"70→80→90%",payout:"Bi-Weekly",standard:true,instant:false,news:true,ea:false,price:"$149/mo"},
  {firm:"Alpha Futures",plan:"Standard",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"Soft Guard",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Eval)",split:"70→80→90%",payout:"Bi-Weekly",standard:true,instant:false,news:true,ea:false,price:"$219/mo"},
  // APEX TRADER FUNDING
  {firm:"Apex Trader Funding",plan:"EOD",size:"25K",target:"$1,500",maxLoss:"$1,500",dll:"None",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$147 one-time"},
  {firm:"Apex Trader Funding",plan:"EOD",size:"50K",target:"$3,000",maxLoss:"$2,500",dll:"None",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$167 one-time"},
  {firm:"Apex Trader Funding",plan:"EOD",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"None",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$207 one-time"},
  {firm:"Apex Trader Funding",plan:"EOD",size:"150K",target:"$9,000",maxLoss:"$5,000",dll:"None",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$297 one-time"},
  {firm:"Apex Trader Funding",plan:"EOD",size:"300K",target:"$20,000",maxLoss:"$7,500",dll:"None",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$517 one-time"},
  // TOP ONE FUTURES
  {firm:"Top One Futures",plan:"Eval",size:"50K",target:"$3,000",maxLoss:"$2,500",dll:"$1,000",drawdown:"EOD Trailing",minDays:"1 day",consistency:"30%",split:"90/10",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$149 one-time"},
  {firm:"Top One Futures",plan:"Eval",size:"100K",target:"$6,000",maxLoss:"$3,500",dll:"$2,000",drawdown:"EOD Trailing",minDays:"1 day",consistency:"30%",split:"90/10",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$249 one-time"},
  {firm:"Top One Futures",plan:"Prime",size:"50K",target:"N/A (Instant)",maxLoss:"$2,500",dll:"$1,000",drawdown:"EOD Trailing",minDays:"None",consistency:"30%",split:"90/10",payout:"After 5 Days",standard:false,instant:true,news:true,ea:true,price:"$299 one-time"},
  {firm:"Top One Futures",plan:"Prime",size:"100K",target:"N/A (Instant)",maxLoss:"$3,500",dll:"$2,000",drawdown:"EOD Trailing",minDays:"None",consistency:"30%",split:"90/10",payout:"After 5 Days",standard:false,instant:true,news:true,ea:true,price:"$499 one-time"},
  // FUNDEDNEXT FUTURES
  {firm:"FundedNext Futures",plan:"Rapid",size:"50K",target:"$3,000",maxLoss:"$2,500",dll:"$1,250",drawdown:"EOD Trailing",minDays:"No min",consistency:"None",split:"80/20→95/5",payout:"Within 24 Hrs",standard:true,instant:false,news:true,ea:true,price:"$159 one-time"},
  {firm:"FundedNext Futures",plan:"Rapid",size:"100K",target:"$6,000",maxLoss:"$3,500",dll:"$2,000",drawdown:"EOD Trailing",minDays:"No min",consistency:"None",split:"80/20→95/5",payout:"Within 24 Hrs",standard:true,instant:false,news:true,ea:true,price:"$249 one-time"},
  // LUCID TRADING
  {firm:"Lucid Trading",plan:"Flex Eval",size:"25K",target:"$1,500",maxLoss:"$1,500",dll:"None",drawdown:"EOD Trailing",minDays:"1 day",consistency:"None",split:"90/10",payout:"5 Trading Days",standard:true,instant:false,news:true,ea:true,price:"$75 one-time"},
  {firm:"Lucid Trading",plan:"Flex Eval",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"None",drawdown:"EOD Trailing",minDays:"1 day",consistency:"None",split:"90/10",payout:"5 Trading Days",standard:true,instant:false,news:true,ea:true,price:"$99 one-time"},
  {firm:"Lucid Trading",plan:"Flex Eval",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"None",drawdown:"EOD Trailing",minDays:"1 day",consistency:"None",split:"90/10",payout:"5 Trading Days",standard:true,instant:false,news:true,ea:true,price:"$199 one-time"},
  {firm:"Lucid Trading",plan:"Flex Eval",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"None",drawdown:"EOD Trailing",minDays:"1 day",consistency:"None",split:"90/10",payout:"5 Trading Days",standard:true,instant:false,news:true,ea:true,price:"$345 one-time"},
  {firm:"Lucid Trading",plan:"Direct",size:"50K",target:"N/A (Instant)",maxLoss:"$2,000",dll:"Soft ($1,200)",drawdown:"EOD Trailing",minDays:"None",consistency:"20%",split:"100% first $10K",payout:"8 Trading Days",standard:false,instant:true,news:true,ea:true,price:"$549 one-time"},
  {firm:"Lucid Trading",plan:"Direct",size:"100K",target:"N/A (Instant)",maxLoss:"$3,000",dll:"Soft ($2,000)",drawdown:"EOD Trailing",minDays:"None",consistency:"20%",split:"100% first $10K",payout:"8 Trading Days",standard:false,instant:true,news:true,ea:true,price:"$799 one-time"},
  {firm:"Lucid Trading",plan:"Direct",size:"150K",target:"N/A (Instant)",maxLoss:"$4,500",dll:"Soft ($2,700)",drawdown:"EOD Trailing",minDays:"None",consistency:"20%",split:"100% first $10K",payout:"8 Trading Days",standard:false,instant:true,news:true,ea:true,price:"$899 one-time"},
  // TOPSTEP
  {firm:"Topstep",plan:"Combine",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"Varies",drawdown:"EOD",minDays:"2 days",consistency:"50%",split:"100% first $10K",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$49/mo"},
  {firm:"Topstep",plan:"Combine",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"Varies",drawdown:"EOD",minDays:"2 days",consistency:"50%",split:"100% first $10K",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$99/mo"},
  {firm:"Topstep",plan:"Combine",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"Varies",drawdown:"EOD",minDays:"2 days",consistency:"50%",split:"100% first $10K",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$149/mo"},
  // TAKE PROFIT TRADER
  {firm:"Take Profit Trader",plan:"Eval",size:"25K",target:"$1,500",maxLoss:"$1,500",dll:"None",drawdown:"EOD Trailing",minDays:"5 days",consistency:"50%",split:"80/20→90/10",payout:"Daily (PRO+)",standard:true,instant:false,news:false,ea:false,price:"$150/mo"},
  {firm:"Take Profit Trader",plan:"Eval",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"None",drawdown:"EOD Trailing",minDays:"5 days",consistency:"50%",split:"80/20→90/10",payout:"Daily (PRO+)",standard:true,instant:false,news:false,ea:false,price:"$175/mo"},
  {firm:"Take Profit Trader",plan:"Eval",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"None",drawdown:"EOD Trailing",minDays:"5 days",consistency:"50%",split:"80/20→90/10",payout:"Daily (PRO+)",standard:true,instant:false,news:false,ea:false,price:"$350/mo"},
  {firm:"Take Profit Trader",plan:"Eval",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"None",drawdown:"EOD Trailing",minDays:"5 days",consistency:"50%",split:"80/20→90/10",payout:"Daily (PRO+)",standard:true,instant:false,news:false,ea:false,price:"$375/mo"},
  // BULENOX
  {firm:"Bulenox",plan:"Eval",size:"25K",target:"$1,500",maxLoss:"$1,500",dll:"$500",drawdown:"EOD or Trailing",minDays:"No min",consistency:"40%",split:"100% first $10K",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$115 one-time"},
  {firm:"Bulenox",plan:"Eval",size:"50K",target:"$3,000",maxLoss:"$2,500",dll:"$1,100",drawdown:"EOD or Trailing",minDays:"No min",consistency:"40%",split:"100% first $10K",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$175 one-time"},
  {firm:"Bulenox",plan:"Eval",size:"100K",target:"$6,000",maxLoss:"$3,500",dll:"$2,000",drawdown:"EOD or Trailing",minDays:"No min",consistency:"40%",split:"100% first $10K",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$265 one-time"},
  {firm:"Bulenox",plan:"Eval",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"$2,200",drawdown:"EOD or Trailing",minDays:"No min",consistency:"40%",split:"100% first $10K",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$325 one-time"},
  {firm:"Bulenox",plan:"Eval",size:"250K",target:"$15,000",maxLoss:"$5,500",dll:"$2,500",drawdown:"EOD or Trailing",minDays:"No min",consistency:"40%",split:"100% first $10K",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$535 one-time"},
];

const LOGO_URL = "/mnt/user-data/outputs/logo.png";

// ── CSS ─────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

:root {
  --bg: #0f1623;
  --bg2: #151e30;
  --bg3: #1b263d;
  --bg4: #22304d;
  --bdr: rgba(14,165,233,0.1);
  --bdr2: rgba(14,165,233,0.2);
  --bdr3: rgba(14,165,233,0.32);
  --brand: #0ea5e9;
  --brand2: #38bdf8;
  --brand3: #7dd3fc;
  --glow: rgba(14,165,233,0.15);
  --glow2: rgba(14,165,233,0.08);
  --purple: #a855f7;
  --green: #34d399;
  --red: #f87171;
  --amber: #fbbf24;
  --pink: #ec4899;
  --orange: #f97316;
  --t1: #f0f5ff;
  --t2: #94adc8;
  --t3: #657a97;
  --t4: #445672;
}
*{margin:0;padding:0;box-sizing:border-box}
body,#root{background:var(--bg);color:var(--t1);font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(14,165,233,0.12);border-radius:3px}

/* ── AMBIENT GLOW BG ── */
.glow-bg{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.glow-bg::before{content:'';position:absolute;width:800px;height:800px;top:-300px;left:50%;transform:translateX(-50%);background:radial-gradient(circle,rgba(14,165,233,0.12) 0%,rgba(14,165,233,0.04) 35%,transparent 70%);border-radius:50%;animation:glowPulse 8s ease-in-out infinite}
.glow-bg::after{content:'';position:absolute;width:600px;height:600px;top:-200px;right:-100px;background:radial-gradient(circle,rgba(168,85,247,0.08) 0%,transparent 65%);border-radius:50%;animation:glowPulse 12s ease-in-out infinite reverse}
@keyframes glowPulse{0%,100%{opacity:1;transform:translateX(-50%) scale(1)}50%{opacity:.7;transform:translateX(-50%) scale(1.08)}}
.glow-orb-left{position:absolute;width:500px;height:500px;top:100px;left:-200px;background:radial-gradient(circle,rgba(14,165,233,0.06) 0%,transparent 70%);border-radius:50%}
.glow-orb-right{position:absolute;width:400px;height:400px;top:200px;right:-150px;background:radial-gradient(circle,rgba(168,85,247,0.05) 0%,transparent 70%);border-radius:50%}
.page-content{position:relative;z-index:1;overflow-x:hidden;max-width:100vw}

/* ── GRADIENT OVERLAY — bright top, dark bottom ── */
.gradient-fade{position:fixed;inset:0;z-index:0;pointer-events:none;background:linear-gradient(180deg,rgba(20,30,55,0.0) 0%,rgba(15,22,35,0.0) 25%,rgba(10,16,28,0.6) 55%,rgba(8,12,22,0.95) 100%)}

/* ── DEAL TICKER ── */
.ticker{background:rgba(21,30,48,0.8);backdrop-filter:blur(12px);border-bottom:1px solid var(--bdr);height:38px;overflow:hidden;position:relative;z-index:2}
.ticker-track{display:flex;align-items:center;gap:40px;height:100%;white-space:nowrap;animation:tickScroll 50s linear infinite}
@keyframes tickScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.tick-item{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:var(--t2);flex-shrink:0;cursor:pointer;padding:0 4px}
.tick-item:hover{color:var(--t1)}
.tick-pct{font-weight:800;padding:2px 7px;border-radius:4px;font-size:11px}
.tick-name{color:var(--t1);font-weight:700}
.tick-code{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--t3);background:var(--bg3);padding:2px 6px;border-radius:3px}
.tick-sep{color:var(--t4);font-size:10px}

/* ── NAV ── */
.nav{position:sticky;top:0;z-index:100;background:rgba(15,22,35,0.88);backdrop-filter:blur(24px) saturate(1.3);border-bottom:1px solid var(--bdr);height:58px;display:flex;align-items:center;padding:0 28px;gap:16px}
.nav-logo{display:flex;align-items:center;gap:9px;cursor:pointer;flex-shrink:0}
.nav-logo img{height:30px;width:30px;border-radius:6px;object-fit:cover}
.nav-logo-text{font-size:17px;font-weight:800;letter-spacing:-.3px}
.nav-logo-text span{color:var(--brand2)}
.nav-tabs{display:flex;gap:1px;margin-left:24px}
.nav-tab{border:none;background:none;color:var(--t3);font-family:inherit;font-size:13px;font-weight:600;padding:8px 14px;cursor:pointer;border-bottom:2px solid transparent;transition:all .15s}
.nav-tab:hover{color:var(--t2)}
.nav-tab.on{color:var(--brand2);border-bottom-color:var(--brand)}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:10px;flex-shrink:0}
.nav-cta{background:linear-gradient(135deg,var(--brand),#0284c7);color:#fff;font-family:inherit;font-size:12px;font-weight:700;padding:7px 16px;border-radius:8px;border:none;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:5px;box-shadow:0 0 12px var(--glow)}
.nav-cta:hover{box-shadow:0 0 28px rgba(14,165,233,0.35);transform:translateY(-1px)}

/* ── WRAP ── */
.wrap{max-width:1300px;margin:0 auto;padding:0 28px}

/* ── HERO ── */
.hero{text-align:center;padding:52px 0 20px}
.hero h1{font-size:38px;font-weight:800;line-height:1.15;letter-spacing:-.8px;margin-bottom:12px}
.hero h1 em{font-style:normal;color:var(--brand2);text-shadow:0 0 30px rgba(14,165,233,0.3)}
.hero p{color:var(--t2);font-size:15px;max-width:520px;margin:0 auto 28px;line-height:1.55}
.hero-nums{display:flex;justify-content:center;gap:40px;flex-wrap:wrap}
.hero-num{text-align:center}
.hero-num b{font-size:22px;font-weight:800;color:var(--brand2);text-shadow:0 0 20px rgba(14,165,233,0.25)}
.hero-num small{display:block;font-size:11px;color:var(--t3);font-weight:600;text-transform:uppercase;letter-spacing:.8px;margin-top:2px}

/* ── OFFERS STRIP ── */
.offers-strip{margin:28px 0;padding:22px 24px;background:linear-gradient(135deg,rgba(14,165,233,0.04) 0%,rgba(168,85,247,0.04) 100%);border:1px solid rgba(14,165,233,0.15);border-radius:16px;position:relative;overflow:hidden}
.offers-strip::before{content:'';position:absolute;top:-1px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--brand),var(--purple),transparent)}
.offers-label{font-size:13px;font-weight:700;color:var(--t2);margin-bottom:14px;display:flex;align-items:center;gap:8px}
.offers-label span{color:var(--brand2)}
.offers-row{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px;scroll-snap-type:x mandatory}
.offer-chip{flex-shrink:0;scroll-snap-align:start;display:flex;align-items:center;gap:10px;background:var(--bg2);border:1px solid var(--bdr);border-radius:10px;padding:10px 14px;cursor:pointer;transition:all .15s;min-width:220px}
.offer-chip:hover{border-color:var(--bdr2);background:var(--bg3);box-shadow:0 0 16px var(--glow2)}
.offer-chip-logo{width:36px;height:36px;border-radius:8px;background:var(--bg3);border:1px solid var(--bdr);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.offer-chip-info{flex:1;min-width:0}
.offer-chip-name{font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.offer-chip-deal{font-size:11px;font-weight:600;color:var(--t3);margin-top:1px}
.offer-chip-pct{font-size:12px;font-weight:800;padding:4px 8px;border-radius:6px;flex-shrink:0}

/* ── TABS + FILTERS ── */
.content-tabs{display:flex;justify-content:center;gap:6px;margin:24px 0 18px}
.ct-btn{background:var(--bg2);border:1px solid var(--bdr);color:var(--t3);font-family:inherit;font-size:13px;font-weight:600;padding:9px 24px;border-radius:100px;cursor:pointer;transition:all .15s}
.ct-btn:hover{border-color:var(--bdr2);color:var(--t1)}
.ct-btn.on{background:var(--brand);border-color:var(--brand);color:#fff;box-shadow:0 0 18px rgba(14,165,233,0.3)}
.view-toggle{display:flex;gap:4px;margin-bottom:16px}
.vt-btn{background:var(--bg2);border:1px solid var(--bdr);color:var(--t3);font-family:inherit;font-size:11px;font-weight:700;padding:5px 12px;border-radius:6px;cursor:pointer;transition:all .15s}
.vt-btn.on{background:var(--bg3);border-color:var(--bdr2);color:var(--t1)}
.filters-row{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}
.f-btn{display:flex;align-items:center;gap:4px;background:var(--bg2);border:1px solid var(--bdr);color:var(--t3);font-family:inherit;font-size:11px;font-weight:600;padding:5px 12px;border-radius:6px;cursor:pointer;transition:all .15s}
.f-btn:hover{border-color:var(--bdr2);color:var(--t1)}
.f-btn.on{border-color:var(--brand);color:var(--brand);background:rgba(14,165,233,0.06)}

/* ── TABLE ── */
.tbl-wrap{border-radius:12px;overflow-x:auto;border:1px solid var(--bdr);-webkit-overflow-scrolling:touch}
.tbl{width:100%;border-collapse:collapse}
.tbl th{background:var(--bg2);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);padding:11px 14px;text-align:left;border-bottom:1px solid var(--bdr);white-space:nowrap}
.tbl td{padding:14px;border-bottom:1px solid var(--bdr);background:var(--bg);font-size:13px;vertical-align:middle}
.tbl tr:hover td{background:rgba(14,165,233,0.03)}
.tbl tr{cursor:pointer;transition:all .15s}

/* FIRM CELL */
.fc{display:flex;align-items:center;gap:11px;min-width:180px}
.fc-logo{width:42px;height:42px;border-radius:10px;background:var(--bg3);border:1px solid var(--bdr);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;position:relative}
.new-tag{position:absolute;top:-6px;right:-6px;background:var(--green);color:#000;font-size:6px;font-weight:900;padding:1px 4px;border-radius:3px;text-transform:uppercase;z-index:2;letter-spacing:.3px}
.fc-name{font-size:14px;font-weight:700}
.fc-hq{font-size:11px;color:var(--t3);margin-top:1px}

/* PULSE SCORE */
.pulse-score{display:flex;align-items:center;gap:6px}
.ps-bar{width:48px;height:6px;background:var(--bg3);border-radius:3px;overflow:hidden}
.ps-fill{height:100%;border-radius:3px}
.ps-num{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700}
.ps-trend{font-size:10px}

/* RATING */
.rating-cell{display:flex;align-items:center;gap:6px}
.rat-badge{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff}
.rat-g{background:#059669} .rat-y{background:#ca8a04} .rat-o{background:#c2410c} .rat-r{background:#dc2626} .rat-na{background:var(--t4)}
.rat-info{display:flex;flex-direction:column}
.rat-stars{color:#facc15;font-size:10px;letter-spacing:.5px}
.rat-ct{font-size:10px;color:var(--t3)}

/* MISC CELLS */
.country-c{display:flex;align-items:center;gap:5px;font-size:12px}
.plat-pills{display:flex;gap:3px;flex-wrap:wrap}
.plat-pill{background:var(--bg3);border:1px solid var(--bdr);border-radius:4px;padding:2px 6px;font-size:9px;font-weight:600;color:var(--t2)}
.plat-more{font-size:9px;color:var(--t4);padding:2px 4px}
.alloc-c{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:14px}
.alloc-bar{width:70px;height:3px;background:var(--bg3);border-radius:2px;margin-top:3px;overflow:hidden}
.alloc-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--brand),var(--purple));box-shadow:0 0 6px rgba(14,165,233,0.3)}

/* FIRM LOGO */
.firm-logo-img{width:100%;height:100%;object-fit:contain;border-radius:inherit;padding:4px}
.firm-logo-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:inherit;font-weight:800;color:#fff;font-size:11px;letter-spacing:-.3px}

/* PROMO — PFM stacked style */
.promo-c{display:inline-flex;flex-direction:column;align-items:center;gap:3px;padding:8px 14px;border-radius:10px;cursor:pointer;transition:all .2s;min-width:84px;position:relative;overflow:hidden}
.promo-c::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,0.08) 0%,transparent 60%);border-radius:inherit;pointer-events:none}
.promo-c:hover{transform:scale(1.05);box-shadow:0 0 16px rgba(0,0,0,0.3)}
.promo-pct{font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:800;color:#fff;letter-spacing:-.2px}
.promo-code-btn{font-family:'Plus Jakarta Sans',sans-serif;font-size:9px;font-weight:700;color:rgba(255,255,255,0.9);display:flex;align-items:center;gap:3px;background:rgba(0,0,0,0.25);padding:2px 8px;border-radius:4px}
.act-btn{background:var(--bg3);border:1px solid var(--bdr2);color:var(--t1);font-family:inherit;font-size:11px;font-weight:700;padding:7px 16px;border-radius:7px;cursor:pointer;transition:all .15s}
.act-btn:hover{background:var(--bg4);border-color:var(--brand);box-shadow:0 0 12px var(--glow2)}

/* ── CARDS VIEW ── */
.cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:14px}
.firm-card{background:var(--bg2);border:1px solid var(--bdr);border-radius:14px;padding:22px;cursor:pointer;transition:all .2s;position:relative}
.firm-card:hover{border-color:var(--bdr3);background:var(--bg3);transform:translateY(-2px);box-shadow:0 4px 24px rgba(14,165,233,0.08),0 0 0 1px rgba(14,165,233,0.1)}
.fcard-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px}
.fcard-left{display:flex;align-items:center;gap:11px}
.fcard-deal{font-size:11px;font-weight:800;padding:3px 8px;border-radius:5px}
.fcard-desc{color:var(--t2);font-size:12.5px;line-height:1.5;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.fcard-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px}
.fcard-stat{background:var(--bg3);border-radius:7px;padding:8px 10px}
.fcard-sl{font-size:9px;color:var(--t4);text-transform:uppercase;letter-spacing:.8px;font-weight:700}
.fcard-sv{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;margin-top:2px}
.fcard-bottom{display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:1px solid var(--bdr)}
.fcard-pulse{display:flex;align-items:center;gap:6px}
.fcard-pulse-label{font-size:10px;color:var(--t3);font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.fcard-pulse-score{font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:800}
.fcard-btn{background:linear-gradient(135deg,var(--brand),#0284c7);color:#fff;font-family:inherit;font-size:12px;font-weight:700;padding:7px 18px;border-radius:7px;border:none;cursor:pointer;box-shadow:0 0 12px rgba(14,165,233,0.2);transition:all .2s}
.fcard-btn:hover{box-shadow:0 0 22px rgba(14,165,233,0.35)}

/* ── CHALLENGES TABLE ── */
.ch-tbl-wrap{border-radius:12px;overflow-x:auto;border:1px solid var(--bdr);-webkit-overflow-scrolling:touch}

/* ── REVIEWS ── */
.rev-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:14px}
.rev-c{background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:20px;transition:border-color .15s}
.rev-c:hover{border-color:var(--bdr2);box-shadow:0 0 14px var(--glow2)}
.rev-top{display:flex;justify-content:space-between;margin-bottom:6px}
.rev-user{font-size:14px;font-weight:700}
.rev-v{font-size:10px;font-weight:700;color:var(--green);text-transform:uppercase;letter-spacing:.8px}
.rev-firm{font-size:11px;color:var(--t3);margin-bottom:5px}
.rev-stars{color:#facc15;font-size:12px;letter-spacing:.5px;margin-bottom:6px}
.rev-text{color:var(--t2);font-size:13px;line-height:1.5}
.rev-date{font-size:10px;color:var(--t4);margin-top:8px}

/* ── BLOG ── */
.blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:14px}
.blog-c{background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:22px;cursor:pointer;transition:all .15s}
.blog-c:hover{border-color:var(--bdr2);background:var(--bg3);box-shadow:0 0 14px var(--glow2)}
.blog-cat{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;padding:3px 9px;border-radius:100px;display:inline-block;margin-bottom:10px}
.blog-t{font-size:16px;font-weight:700;line-height:1.3;margin-bottom:7px}
.blog-ex{color:var(--t2);font-size:12.5px;line-height:1.5;margin-bottom:10px}
.blog-f{display:flex;justify-content:space-between;font-size:11px;color:var(--t4)}

/* ── DETAIL ── */
.det{padding:36px 0 80px}
.det-back{display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid var(--bdr);color:var(--t2);font-family:inherit;font-size:12px;font-weight:600;padding:7px 16px;border-radius:7px;cursor:pointer;margin-bottom:24px}
.det-back:hover{border-color:var(--bdr2);color:var(--t1)}
.det-hero{display:flex;align-items:center;gap:20px;margin-bottom:28px}
.det-logo{width:60px;height:60px;border-radius:14px;background:var(--bg3);border:1px solid var(--bdr);display:flex;align-items:center;justify-content:center;font-size:30px}
.det-name{font-size:28px;font-weight:800;letter-spacing:-.5px}
.det-sub{font-size:13px;color:var(--t2);margin-top:2px}
.det-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:10px;margin-bottom:24px}
.det-stat{background:var(--bg2);border:1px solid var(--bdr);border-radius:10px;padding:14px}
.det-stat-l{font-size:10px;color:var(--t4);text-transform:uppercase;letter-spacing:1px;font-weight:700}
.det-stat-v{font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:700;margin-top:3px}
.det-desc{background:var(--bg2);border:1px solid var(--bdr);border-radius:10px;padding:20px;color:var(--t2);font-size:14px;line-height:1.7}
.det-section{background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;overflow:hidden}
.det-section .info-row{display:flex;justify-content:space-between;align-items:flex-start;padding:14px 20px;border-bottom:1px solid var(--bdr)}
.det-section .info-row:last-child{border-bottom:none}
.det-section .info-label{color:var(--t3);font-size:13px;font-weight:600;min-width:140px;flex-shrink:0}
.det-section .info-val{font-size:13px;font-weight:600;color:var(--t1);text-align:right;line-height:1.5;max-width:65%}
.det-section .info-val.hl{color:var(--brand2)}
.det-pros-cons{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}
@media(max-width:700px){.det-pros-cons{grid-template-columns:1fr}}
.det-deal{margin-top:20px;padding:16px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:10px;display:flex;align-items:center;gap:16px}

/* ── GIVEAWAY ── */
.gw-hero{text-align:center;padding:32px 0 24px}
.gw-hero h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:800;letter-spacing:-.5px;margin-bottom:8px}
.gw-hero h2 em{font-style:normal;color:var(--brand2);text-shadow:0 0 20px rgba(14,165,233,0.3)}
.gw-hero p{color:var(--t2);font-size:14px;max-width:500px;margin:0 auto;line-height:1.55}
.gw-prize{background:var(--bg2);border:1px solid var(--bdr2);border-radius:16px;padding:28px;text-align:center;margin:24px 0;position:relative;overflow:hidden}
.gw-prize::before{content:'';position:absolute;top:-1px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--brand),var(--purple),transparent)}
.gw-prize-label{font-size:11px;font-weight:700;color:var(--brand2);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px}
.gw-prize-title{font-family:'Plus Jakarta Sans',sans-serif;font-size:24px;font-weight:800;margin-bottom:6px}
.gw-prize-sub{color:var(--t2);font-size:13px}
.gw-prize-val{font-family:'JetBrains Mono',monospace;font-size:32px;font-weight:800;color:var(--brand2);margin:12px 0;text-shadow:0 0 24px rgba(14,165,233,0.3)}
.gw-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:24px 0}
.gw-step{background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:20px;text-align:center}
.gw-step-num{font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:800;color:var(--brand2);margin-bottom:6px}
.gw-step-title{font-size:14px;font-weight:700;margin-bottom:4px}
.gw-step-desc{font-size:12px;color:var(--t2);line-height:1.4}
.gw-form{background:var(--bg2);border:1px solid var(--bdr2);border-radius:16px;padding:28px;margin:24px 0;max-width:560px;margin-left:auto;margin-right:auto}
.gw-form h3{font-family:'Plus Jakarta Sans',sans-serif;font-size:18px;font-weight:700;margin-bottom:16px;text-align:center}
.gw-field{margin-bottom:14px}
.gw-field label{display:block;font-size:11px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:5px}
.gw-field input,.gw-field select,.gw-field textarea{width:100%;background:var(--bg3);border:1px solid var(--bdr);border-radius:8px;padding:10px 12px;color:var(--t1);font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;outline:none;transition:border-color .15s}
.gw-field input:focus,.gw-field select:focus,.gw-field textarea:focus{border-color:var(--brand)}
.gw-field select{cursor:pointer;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%238da4c4'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center}
.gw-field select option{background:var(--bg2);color:var(--t1)}
.gw-field textarea{resize:vertical;min-height:60px}
.gw-submit{width:100%;background:linear-gradient(135deg,var(--brand),#0284c7);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;padding:12px;border-radius:10px;border:none;cursor:pointer;box-shadow:0 0 14px rgba(14,165,233,0.25);transition:all .2s;margin-top:8px}
.gw-submit:hover{box-shadow:0 0 24px rgba(14,165,233,0.4);transform:translateY(-1px)}
.gw-submit:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}
.gw-success{text-align:center;padding:32px 0}
.gw-success-icon{font-size:48px;margin-bottom:12px}
.gw-success h3{font-size:20px;font-weight:700;margin-bottom:8px;color:var(--green)}
.gw-success p{color:var(--t2);font-size:13px;max-width:400px;margin:0 auto;line-height:1.5}
.gw-rules{background:var(--bg2);border:1px solid var(--bdr);border-radius:12px;padding:20px;margin:24px 0}
.gw-rules h4{font-size:14px;font-weight:700;margin-bottom:10px}
.gw-rules ul{list-style:none;padding:0}
.gw-rules ul li{color:var(--t2);font-size:12.5px;line-height:1.5;padding:3px 0;padding-left:18px;position:relative}
.gw-rules ul li::before{content:'✓';position:absolute;left:0;color:var(--brand2);font-size:11px}
.gw-entries{margin:24px 0}
.gw-entries-hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.gw-entries-count{font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--brand2)}

/* ── TOAST ── */
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:var(--brand);color:#fff;font-size:12px;font-weight:700;padding:10px 24px;border-radius:100px;z-index:200;box-shadow:0 4px 20px var(--glow);animation:ti .3s ease-out,to .3s ease-in 1.5s forwards}
@keyframes ti{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
@keyframes to{to{opacity:0;transform:translateX(-50%) translateY(20px)}}

/* ── FOOTER ── */
.foot{border-top:1px solid var(--bdr);padding:36px 28px;max-width:1300px;margin:0 auto}
.foot-in{display:flex;justify-content:space-between;gap:36px;flex-wrap:wrap}
.foot-br{max-width:260px}
.foot-n{font-size:15px;font-weight:800;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.foot-d{font-size:11px;color:var(--t3);line-height:1.5}
.foot-c h4{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);margin-bottom:8px}
.foot-c a{display:block;font-size:12px;color:var(--t2);text-decoration:none;margin-bottom:4px;cursor:pointer}
.foot-c a:hover{color:var(--brand2)}
.foot-b{text-align:center;margin-top:24px;padding-top:14px;border-top:1px solid var(--bdr);font-size:10px;color:var(--t4)}

/* ── OFFERS PAGE ── */
.offers-page-hdr{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px}
.offers-page-count{font-size:14px;font-weight:700}.offers-page-count span{color:var(--brand2)}
.offers-filters{display:flex;gap:6px;flex-wrap:wrap}
.offer-card{background:var(--bg2);border:1px solid var(--bdr);border-radius:14px;display:flex;align-items:stretch;overflow:hidden;transition:all .2s;margin-bottom:12px}
.offer-card:hover{border-color:var(--bdr2);box-shadow:0 4px 24px rgba(0,0,0,0.3)}
.offer-pct-box{min-width:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 20px;position:relative}
.offer-pct-box .tag{position:absolute;top:10px;left:50%;transform:translateX(-50%);font-size:8px;font-weight:800;padding:2px 8px;border-radius:4px;background:rgba(255,255,255,0.15);color:#fff;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}
.offer-pct-num{font-family:'JetBrains Mono',monospace;font-size:28px;font-weight:900;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.3)}
.offer-pct-label{font-size:10px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px;margin-top:2px}
.offer-body{flex:1;padding:20px 24px;display:flex;flex-direction:column;justify-content:center;gap:6px;border-left:1px solid var(--bdr)}
.offer-body-top{display:flex;align-items:center;gap:10px}
.offer-firm-name{font-size:16px;font-weight:700}
.offer-desc{color:var(--t2);font-size:13px;line-height:1.4}
.offer-right{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:8px;padding:20px 24px;min-width:200px}
.offer-code-btn{display:flex;align-items:center;gap:6px;background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px;padding:8px 14px;cursor:pointer;transition:all .15s}
.offer-code-btn:hover{border-color:var(--brand);box-shadow:0 0 12px var(--glow2)}
.offer-code-label{font-size:10px;color:var(--t3);font-weight:600}
.offer-code-val{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:800;color:var(--t1)}
.offer-code-copy{font-size:12px;color:var(--t3)}
.offer-expires{font-size:11px;color:var(--t3)}
.offer-expires span{color:var(--amber)}
.offer-apply-btn{background:linear-gradient(135deg,var(--brand),#0284c7);color:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;padding:10px 24px;border-radius:8px;border:none;cursor:pointer;transition:all .2s;box-shadow:0 0 10px rgba(14,165,233,0.2)}
.offer-apply-btn:hover{box-shadow:0 0 20px rgba(14,165,233,0.4);transform:translateY(-1px)}
@media(max-width:700px){
  .offer-card{flex-direction:column}
  .offer-pct-box{min-width:auto;padding:16px;flex-direction:row;gap:12px}
  .offer-pct-box .tag{position:static;transform:none}
  .offer-body{border-left:none;border-top:1px solid var(--bdr);padding:14px 16px}
  .offer-right{flex-direction:row;padding:12px 16px;min-width:auto;border-top:1px solid var(--bdr);justify-content:space-between}
}

/* ── BLOG READING ── */
.top-pick-badge{display:inline-flex;align-items:center;position:relative;cursor:default;vertical-align:middle;margin-left:4px;color:#f59e0b;filter:drop-shadow(0 0 3px rgba(245,158,11,0.4))}
.top-pick-badge svg{width:14px;height:14px}
.top-pick-badge::after{content:'Pulse Top Pick';position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:#1e293b;color:#f59e0b;font-size:10px;font-weight:700;padding:4px 10px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s;border:1px solid rgba(245,158,11,0.3);box-shadow:0 4px 12px rgba(0,0,0,0.4)}
.top-pick-badge:hover::after{opacity:1}
.blog-body{color:var(--t1);font-size:15px;line-height:1.8}
.blog-h2{font-family:'Plus Jakarta Sans',sans-serif;font-size:19px;font-weight:700;margin:28px 0 12px;color:var(--t1);letter-spacing:-.3px}
.blog-p{margin:0 0 18px;color:var(--t2);font-size:15px;line-height:1.8}
.blog-p strong{color:var(--t1);font-weight:700}
.blog-c:hover{border-color:var(--bdr2);transform:translateY(-2px);transition:all .2s}
@media(max-width:700px){.blog-body{font-size:14px}.blog-h2{font-size:17px}.blog-p{font-size:14px}}

/* ── MOBILE NAV ── */
.nav-burger{display:none;background:none;border:none;cursor:pointer;padding:6px;flex-direction:column;gap:4px}
.nav-burger span{display:block;width:20px;height:2px;background:var(--t2);border-radius:2px;transition:all .2s}
.mobile-menu{position:fixed;top:56px;left:0;right:0;background:var(--bg1);border-bottom:1px solid var(--bdr2);padding:8px 14px 14px;z-index:199;display:flex;flex-direction:column;gap:2px;box-shadow:0 12px 40px rgba(0,0,0,0.5);animation:menuIn .15s ease-out}
@keyframes menuIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.mobile-menu-item{background:none;border:none;color:var(--t2);font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:600;padding:14px 16px;border-radius:10px;text-align:left;cursor:pointer;transition:all .15s}
.mobile-menu-item:hover,.mobile-menu-item.on{background:var(--bg3);color:var(--t1)}
.mobile-menu-item.on{color:var(--brand2)}

@media(max-width:900px){
  .nav-tabs{display:none}
  .nav-burger{display:flex}
  .cards-grid{grid-template-columns:1fr}
  .rev-grid,.blog-grid{grid-template-columns:1fr}
  .det-pros-cons{grid-template-columns:1fr}
  .gw-steps{grid-template-columns:1fr 1fr}
  .tbl-wrap{margin:0 -20px;border-radius:0}
}
@media(max-width:700px){
  *{box-sizing:border-box}
  body{overflow-x:hidden}
  .wrap{padding:0 14px;max-width:100vw;overflow-x:hidden}
  .nav{padding:0 14px;gap:6px}
  .nav-logo img{width:28px;height:28px}
  .nav-logo-text{font-size:13px}
  .nav-cta{font-size:10px;padding:6px 10px}
  .hero{padding:24px 0 16px}
  .hero h1{font-size:22px;line-height:1.3}
  .hero p{font-size:12px;padding:0 8px}
  .hero-nums{gap:12px;flex-wrap:wrap;justify-content:center}
  .hero-nums div{min-width:55px}
  .hero-nums span:first-child{font-size:16px}
  .hero-nums span:last-child{font-size:8px}
  .content-tabs{flex-wrap:nowrap;gap:4px;margin:14px 0 10px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;scrollbar-width:none}
  .content-tabs::-webkit-scrollbar{display:none}
  .ct-btn{padding:7px 12px;font-size:11px;white-space:nowrap;flex-shrink:0}
  .filters-row{flex-wrap:nowrap;gap:4px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:4px;scrollbar-width:none}
  .filters-row::-webkit-scrollbar{display:none}
  .f-btn{font-size:10px;padding:6px 10px;white-space:nowrap;flex-shrink:0}
  .view-toggle{margin-top:6px}
  .vt-btn{font-size:10px;padding:5px 10px}
  /* Table — force horizontal scroll */
  .tbl-wrap,.ch-tbl-wrap{margin:0 -14px;border-radius:0;overflow-x:auto;-webkit-overflow-scrolling:touch}
  .tbl{font-size:11px;min-width:700px}
  .tbl th{font-size:8px;padding:8px 6px;white-space:nowrap}
  .tbl td{padding:8px 6px;font-size:11px}
  /* Offers strip */
  .offers-strip{margin:0 -14px;border-radius:0;padding:14px}
  .offers-row{gap:6px;padding:0 8px}
  .offers-label{font-size:11px;padding:0 8px;margin-bottom:8px}
  .offer-chip{min-width:180px;padding:8px 10px}
  .offer-chip-name{font-size:12px}
  .offer-chip-pct{font-size:10px;padding:3px 6px}
  /* Offers page cards */
  .offer-card{flex-direction:column}
  .offer-pct-box{min-width:auto;padding:16px;flex-direction:row;gap:12px;justify-content:flex-start}
  .offer-pct-box .tag{position:static;transform:none}
  .offer-pct-num{font-size:22px}
  .offer-body{border-left:none;border-top:1px solid var(--bdr);padding:14px 16px}
  .offer-firm-name{font-size:14px}
  .offer-desc{font-size:12px}
  .offer-right{flex-direction:row;flex-wrap:wrap;padding:12px 16px;min-width:auto;border-top:1px solid var(--bdr);justify-content:space-between;gap:6px}
  .offer-apply-btn{padding:8px 16px;font-size:12px}
  /* Cards */
  .firm-card{padding:16px}
  .fcard-stats{grid-template-columns:1fr 1fr}
  .fc-name{font-size:13px}
  /* Detail page */
  .det{padding:20px 0 60px}
  .det-back{font-size:12px;padding:8px 12px;min-height:40px;margin-bottom:16px}
  .det-hero{flex-direction:column;gap:12px;align-items:flex-start;margin-bottom:20px}
  .det-name{font-size:22px}
  .det-sub{font-size:12px}
  .det-grid{grid-template-columns:1fr 1fr;gap:8px}
  .det-stat{padding:10px}
  .det-stat-l{font-size:8px}
  .det-stat-v{font-size:12px}
  .det-section .info-row{flex-direction:column;gap:4px;padding:12px 14px}
  .det-section .info-val{text-align:left;max-width:100%;font-size:12px;line-height:1.5}
  .det-section .info-label{font-size:11px;min-width:auto}
  .det-deal{flex-direction:column;gap:8px;text-align:center;padding:14px}
  .det-deal .act-btn{margin:0 auto}
  .det-desc{padding:14px;font-size:13px}
  /* Giveaway */
  .gw-steps{grid-template-columns:1fr}
  .gw-form{padding:16px;margin:14px 0}
  .gw-prize{padding:20px}
  .gw-prize-val{font-size:24px}
  .gw-prize-title{font-size:17px}
  .gw-hero h2{font-size:20px}
  .gw-hero p{font-size:12px}
  .gw-field input,.gw-field select,.gw-field textarea{font-size:16px}
  .gw-submit{font-size:13px;padding:11px}
  .gw-rules{padding:14px}
  .gw-rules ul li{font-size:11px}
  /* Footer */
  .foot{padding:24px 14px}
  .foot-in{flex-direction:column;gap:16px}
  .foot-c{min-width:auto}
  .foot-c h4{font-size:13px}
  .foot-c a{font-size:12px}
  .foot-b{font-size:9px}
  /* Ticker */
  .ticker{font-size:10px;padding:6px 0}
  /* Blog post */
  .blog-body{font-size:14px}
  .blog-h2{font-size:16px}
  .blog-p{font-size:13px;line-height:1.7}
  /* Misc */
  .section-title{font-size:15px}
}
@media(max-width:400px){
  .wrap{padding:0 8px}
  .nav{padding:0 8px}
  .hero h1{font-size:18px}
  .hero p{font-size:11px}
  .content-tabs{gap:3px}
  .ct-btn{padding:6px 8px;font-size:10px}
  .det-grid{grid-template-columns:1fr}
  .det-name{font-size:18px}
  .fcard-stats{grid-template-columns:1fr}
  .offer-pct-num{font-size:18px}
  .gw-field input,.gw-field select,.gw-field textarea{font-size:16px}
}
`;

// Pulse Score: editorial ranking by ThePropPulse based on overall trader experience, payouts, rules, support, and trust
const PULSE_SCORES = {"Tradeify":95,"Lucid Trading":94,"My Funded Futures":94,"Alpha Futures":93,"Top One Futures":93,"Take Profit Trader":90,"FundedNext Futures":90,"Apex Trader Funding":92,"Bulenox":87,"Topstep":83};
const TOP_PICKS = new Set(["Tradeify","Apex Trader Funding","Top One Futures"]);
const TopPickBadge = ({name}) => TOP_PICKS.has(name) ? <span className="top-pick-badge"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span> : null;
// Bulletproof clipboard copy with fallback
const copyToClipboard = (text) => {
  if(navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for non-HTTPS / sandbox environments
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "-9999px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand("copy"); } catch(e) {}
  document.body.removeChild(ta);
  return Promise.resolve();
};

const calcPulse = (rating, reviews, name) => PULSE_SCORES[name] || 75;
const pulseColor = (s) => s>=90?"#34d399":s>=80?"#0ea5e9":s>=70?"#eab308":"#f87171";
const ratClass = (r) => r>=4.5?"rat-g":r>=4?"rat-y":r>=3.5?"rat-o":r>0?"rat-r":"rat-na";
const allocPct = (s) => { const n=s.replace(/[^0-9.MK]/g,""); let v=parseFloat(n); if(n.includes("M"))v*=1000; return Math.min((v/3000)*100,100); };
const trendIcon = (t) => t==="up"?"▲":t==="down"?"▼":t==="new"?"★":"–";
const trendColor = (t) => t==="up"?"#34d399":t==="down"?"#f87171":t==="new"?"#0ea5e9":"var(--t4)";

// ── COMPONENTS ──────────────────────────────────────────────────────────────
const FirmLogo = ({f,size=42}) => {
  const logo = LOGOS[f.name];
  const r = size>50?14:10;
  return (
    <div style={{width:size,height:size,flexShrink:0,position:'relative'}}>
      {f.trend==="new"&&<span className="new-tag">NEW</span>}
      <div style={{width:'100%',height:'100%',borderRadius:r,background:'var(--bg3)',border:'1px solid var(--bdr)',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
        {logo ? (
          <img src={logo} alt={f.name} style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:r-1}}/>
        ) : (
          <div className="firm-logo-fallback" style={{background:f.brandGrad,fontSize:size>50?14:f.initials.length>2?9:11}}>{f.initials}</div>
        )}
      </div>
    </div>
  );
};
const Ticker = () => {
  const items = [...DEALS,...DEALS,...DEALS];
  return (
    <div className="ticker"><div className="ticker-track">
      {items.map((d,i)=><div key={i} className="tick-item">
        <span className="tick-pct" style={{background:d.color+"18",color:d.color}}>{d.pct}</span>
        <span className="tick-name">{d.firm}</span>
        <span className="tick-code">{d.code}</span>
        <span className="tick-sep">•</span>
      </div>)}
    </div></div>
  );
};

const NavBar = ({tab,setTab,setPage}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [["firms","Firms"],["challenges","Challenges"],["offers","Offers"],["giveaways","🎟️ Giveaways"],["reviews","Reviews"],["blog","Blog"]];
  const go = (k) => { setPage("home"); setTab(k); setMobileOpen(false); };
  return (<>
  <nav className="nav">
    <div className="nav-logo" onClick={()=>go("firms")}>
      <img src={LOGO_URL} alt="P" onError={e=>{e.target.style.display='none'}}/>
      <span className="nav-logo-text">The<span>PropPulse</span></span>
    </div>
    <div className="nav-tabs">
      {navItems.map(([k,l])=>(
        <button key={k} className={`nav-tab ${tab===k?"on":""}`} onClick={()=>go(k)}>{l}</button>
      ))}
    </div>
    <div className="nav-right">
      <button className="nav-cta" onClick={()=>go("offers")}>🔥 Deals</button>
      <button className="nav-burger" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Menu">
        <span/><span/><span/>
      </button>
    </div>
  </nav>
  {mobileOpen&&<div className="mobile-menu">
    {navItems.map(([k,l])=>(
      <button key={k} className={`mobile-menu-item ${tab===k?"on":""}`} onClick={()=>go(k)}>{l}</button>
    ))}
  </div>}
  </>);
};

const OffersStrip = () => {
  const [copied,setCopied] = useState(null);
  return (
    <div className="offers-strip">
      <div className="offers-label">⚡ <span>Exclusive Futures Offers</span> — March 2026</div>
      <div className="offers-row">
        {DEALS.map((d,i)=>{
          const f=FIRMS.find(f=>f.name===d.firm);
          return (
            <div key={i} className="offer-chip" onClick={()=>{copyToClipboard(d.code);setCopied(i);setTimeout(()=>setCopied(null),1500)}}>
              {f?<FirmLogo f={f} size={36}/>:<span>?</span>}
              <div className="offer-chip-info">
                <div className="offer-chip-name">{d.firm}</div>
                <div className="offer-chip-deal">Code: <b style={{color:d.color}}>{d.code}</b></div>
              </div>
              <span className="offer-chip-pct" style={{background:d.color+"15",color:d.color}}>{d.pct}</span>
            </div>
          );
        })}
      </div>
      {copied!==null&&<div className="toast">CODE COPIED</div>}
    </div>
  );
};

const OffersPage = () => {
  const [copied,setCopied] = useState(null);
  const [filter,setFilter] = useState("all");
  const copy = (i,code) => {copyToClipboard(code);setCopied(i);setTimeout(()=>setCopied(null),2000)};

  const filtered = filter==="all" ? DEALS : filter==="new" ? DEALS.filter(d=>d.tag) : filter==="exclusive" ? DEALS.filter(d=>d.code==="PULSE") : DEALS;

  return (<div>
    <div className="offers-page-hdr">
      <div className="offers-page-count">Futures Exclusive Offers <span>{filtered.length}</span></div>
      <div className="offers-filters">
        <button className={`f-btn ${filter==="all"?"on":""}`} onClick={()=>setFilter("all")}>🔥 All Offers</button>
        <button className={`f-btn ${filter==="new"?"on":""}`} onClick={()=>setFilter("new")}>✨ New Offers</button>
        <button className={`f-btn ${filter==="exclusive"?"on":""}`} onClick={()=>setFilter("exclusive")}>💎 Pulse Exclusive</button>
      </div>
    </div>
    {filtered.map((d,i)=>{
      const f = FIRMS.find(f=>f.name===d.firm);
      return (
        <div key={i} className="offer-card">
          <div className="offer-pct-box" style={{background:`linear-gradient(135deg,${d.color},${d.color}dd)`}}>
            {d.tag&&<span className="tag">{d.tag}</span>}
            <div className="offer-pct-num">{d.pct.replace(" OFF","")}</div>
            <div className="offer-pct-label">OFF</div>
          </div>
          <div className="offer-body">
            <div className="offer-body-top">
              {f&&<FirmLogo f={f} size={38}/>}
              <div>
                <div className="offer-firm-name">{d.firm} <TopPickBadge name={d.firm}/></div>
                {f&&<div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}>
                  <span className={`rat-badge ${ratClass(f.rating)}`} style={{fontSize:10,padding:"1px 6px"}}>{f.rating}</span>
                  <span style={{fontSize:10,color:"var(--t3)"}}>{f.reviews.toLocaleString()} reviews</span>
                </div>}
              </div>
            </div>
            <div className="offer-desc">{d.desc}</div>
          </div>
          <div className="offer-right">
            <div className="offer-code-btn" onClick={()=>copy(i,d.code)}>
              <div>
                <div className="offer-code-label">Code</div>
                <div className="offer-code-val">{d.code}</div>
              </div>
              <span className="offer-code-copy">{copied===i?"✓":"📋"}</span>
            </div>
            {d.expires&&<div className="offer-expires">📅 Ends: <span>{d.expires}</span></div>}
            <button className="offer-apply-btn" onClick={()=>copy(i,d.code)}>Apply</button>
          </div>
        </div>
      );
    })}
    {copied!==null&&<div className="toast">CODE COPIED!</div>}
  </div>);
};

const FirmTable = ({firms,onSelect}) => {
  const [copied,setCopied] = useState(false);
  const copyCode = (e,code) => {e.stopPropagation();copyToClipboard(code);setCopied(true);setTimeout(()=>setCopied(false),1800)};
  return (<>
  <div className="tbl-wrap"><table className="tbl"><thead><tr>
    <th>FIRM</th><th>PULSE SCORE</th><th>RATING</th><th>COUNTRY</th><th>PLATFORMS</th><th>MAX ALLOCATION</th><th>PROMO</th><th></th>
  </tr></thead><tbody>
    {firms.map(f=>{
      const deal=DEALS.find(d=>d.firm===f.name);
      return (<tr key={f.id} onClick={()=>onSelect(f)}>
        <td><div className="fc">
          <FirmLogo f={f} size={42}/>
          <div><div className="fc-name">{f.name} <TopPickBadge name={f.name}/></div><div className="fc-hq">{f.hq} · Est. {f.founded}</div></div>
        </div></td>
        <td><div className="pulse-score">
          <span className="ps-num" style={{color:pulseColor(calcPulse(f.rating,f.reviews,f.name))}}>{calcPulse(f.rating,f.reviews,f.name)}</span>
          <div className="ps-bar"><div className="ps-fill" style={{width:calcPulse(f.rating,f.reviews,f.name)+"%",background:pulseColor(calcPulse(f.rating,f.reviews,f.name))}}/></div>
          <span className="ps-trend" style={{color:trendColor(f.trend)}}>{trendIcon(f.trend)}</span>
        </div></td>
        <td><div className="rating-cell">
          <span className={`rat-badge ${ratClass(f.rating)}`}>{f.rating>0?f.rating:"—"}</span>
          <div className="rat-info"><span className="rat-stars">{"★".repeat(Math.floor(f.rating))}</span><span className="rat-ct">{f.reviews>0?f.reviews+" reviews":"< 10 reviews"}</span></div>
        </div></td>
        <td><div className="country-c">{f.flag} {f.country}</div></td>
        <td><div className="plat-pills">{f.platforms.map((p,i)=>p.startsWith("+")?<span key={i} className="plat-more">{p}</span>:<span key={i} className="plat-pill">{p}</span>)}</div></td>
        <td><div className="alloc-c">{f.maxAlloc}</div><div className="alloc-bar"><div className="alloc-fill" style={{width:allocPct(f.maxAlloc)+"%"}}/></div></td>
        <td>{deal?<div className="promo-c" style={{background:deal.color}} onClick={e=>copyCode(e,deal.code)}>
          <span className="promo-pct">{deal.pct}</span>
          <span className="promo-code-btn">PULSE 📋</span>
        </div>:<span style={{color:"var(--t4)",fontSize:11}}>—</span>}</td>
        <td><button className="act-btn" onClick={e=>{e.stopPropagation();onSelect(f)}}>View →</button></td>
      </tr>);
    })}
  </tbody></table></div>
  {copied&&<div className="toast">PULSE CODE COPIED</div>}
  </>);
};

const FirmCards = ({firms,onSelect}) => (
  <div className="cards-grid">{firms.map(f=>{
    const deal=DEALS.find(d=>d.firm===f.name);
    return (<div key={f.id} className="firm-card" onClick={()=>onSelect(f)}>
      <div className="fcard-top">
        <div className="fcard-left">
          <FirmLogo f={f} size={38}/>
          <div><div className="fc-name" style={{fontSize:15}}>{f.name} <TopPickBadge name={f.name}/></div><div className="fc-hq">{f.flag} {f.hq} · Est. {f.founded}</div></div>
        </div>
        {deal&&<span className="fcard-deal" style={{background:deal.color+"15",color:deal.color}}>{deal.pct}</span>}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <span className={`rat-badge ${ratClass(f.rating)}`} style={{width:26,height:26,fontSize:10}}>{f.rating>0?f.rating:"—"}</span>
        <span className="rat-stars">{"★".repeat(Math.floor(f.rating))}</span>
        <span className="rat-ct">{f.reviews>0?f.reviews+" reviews":"New"}</span>
      </div>
      <div className="fcard-desc">{f.desc}</div>
      <div className="fcard-stats">
        <div className="fcard-stat"><div className="fcard-sl">Max Alloc.</div><div className="fcard-sv" style={{color:f.color}}>{f.maxAlloc}</div></div>
        <div className="fcard-stat"><div className="fcard-sl">Profit Split</div><div className="fcard-sv">{f.split.split("→")[0].trim()}</div></div>
        <div className="fcard-stat"><div className="fcard-sl">Payout</div><div className="fcard-sv">{f.paySpeed}</div></div>
      </div>
      <div className="fcard-bottom">
        <div className="fcard-pulse">
          <span className="fcard-pulse-label">Pulse</span>
          <span className="fcard-pulse-score" style={{color:pulseColor(calcPulse(f.rating,f.reviews,f.name))}}>{calcPulse(f.rating,f.reviews,f.name)}</span>
          <span style={{fontSize:10,color:trendColor(f.trend)}}>{trendIcon(f.trend)}</span>
        </div>
        <button className="fcard-btn">View Firm →</button>
      </div>
    </div>);
  })}</div>
);

const ChallengesTab = () => {
  const [filters, setFilters] = useState({instant:false, daily:false, fiveDay:false, weekly:false, noDLL:false, noConsistency:false, newsOk:false, eaOk:false, oneDayPass:false, size:"50K"});
  const toggle = (k) => setFilters(p=>({...p,[k]:!p[k]}));
  const setSize = (v) => setFilters(p=>({...p,size:p.size===v?"":v}));

  const filtered = useMemo(()=> {
    const hasSpecialFilter = filters.instant || filters.daily || filters.fiveDay || filters.weekly;
    return CHALLENGES.filter(c => {
    // Default: only show standard plans. If instant/payout filters active, show matching non-standard too
    if(!hasSpecialFilter && !c.standard) return false;
    if(filters.instant && !c.instant) return false;
    if(filters.daily && !c.payout.toLowerCase().includes("daily")) return false;
    if(filters.fiveDay && !c.payout.toLowerCase().includes("5")) return false;
    if(filters.weekly && !c.payout.toLowerCase().includes("weekly")) return false;
    if(filters.noDLL && c.dll!=="None") return false;
    if(filters.noConsistency && c.consistency!=="None") return false;
    if(filters.newsOk && !c.news) return false;
    if(filters.eaOk && !c.ea) return false;
    if(filters.oneDayPass && !c.minDays.includes("1 day") && c.minDays!=="None") return false;
    if(filters.size && c.size!==filters.size) return false;
    return true;
  });},[filters]);

  const activeCount = Object.values(filters).filter(v=>v===true||(typeof v==="string"&&v!=="")).length;
  const getFirm = (name) => FIRMS.find(f=>f.name===name);
  const allSizes = [...new Set(CHALLENGES.map(c=>c.size))].sort((a,b)=>{const n=s=>parseInt(s.replace("K",""));return n(a)-n(b)});

  return (<div>
    <div style={{marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <span style={{fontSize:13,fontWeight:700,color:"var(--t2)"}}>⚙ Filters {activeCount>0&&<span style={{color:"var(--brand2)",marginLeft:4}}>({activeCount} active)</span>}</span>
        {activeCount>0&&<button className="f-btn" style={{fontSize:10,padding:"3px 10px"}} onClick={()=>setFilters({instant:false,daily:false,fiveDay:false,weekly:false,noDLL:false,noConsistency:false,newsOk:false,eaOk:false,oneDayPass:false,size:""})}>✕ Clear All</button>}
      </div>
      <div className="filters-row" style={{marginBottom:8}}>
        <button className={`f-btn ${filters.instant?"on":""}`} onClick={()=>toggle("instant")}>⚡ Instant Funding</button>
        <button className={`f-btn ${filters.oneDayPass?"on":""}`} onClick={()=>toggle("oneDayPass")}>🏃 1 Day to Pass</button>
        <button className={`f-btn ${filters.daily?"on":""}`} onClick={()=>toggle("daily")}>📅 Daily Payouts</button>
        <button className={`f-btn ${filters.fiveDay?"on":""}`} onClick={()=>toggle("fiveDay")}>📆 5-Day Payouts</button>
        <button className={`f-btn ${filters.weekly?"on":""}`} onClick={()=>toggle("weekly")}>📆 Weekly Payouts</button>
      </div>
      <div className="filters-row" style={{marginBottom:8}}>
        <button className={`f-btn ${filters.noDLL?"on":""}`} onClick={()=>toggle("noDLL")}>🚫 No Daily Loss Limit</button>
        <button className={`f-btn ${filters.noConsistency?"on":""}`} onClick={()=>toggle("noConsistency")}>🚫 No Consistency Rule</button>
        <button className={`f-btn ${filters.newsOk?"on":""}`} onClick={()=>toggle("newsOk")}>📰 News Trading OK</button>
        <button className={`f-btn ${filters.eaOk?"on":""}`} onClick={()=>toggle("eaOk")}>🤖 EAs / Bots Allowed</button>
      </div>
      <div className="filters-row">
        <span style={{fontSize:11,color:"var(--t3)",fontWeight:600,marginRight:4}}>Account Size:</span>
        {allSizes.map(s=>(
          <button key={s} className={`f-btn ${filters.size===s?"on":""}`} onClick={()=>setSize(s)} style={{padding:"4px 10px",fontSize:11}}>${s}</button>
        ))}
      </div>
    </div>
    <div style={{fontSize:12,color:"var(--t3)",marginBottom:10}}>Showing <b style={{color:"var(--t1)"}}>{filtered.length}</b> challenges from <b style={{color:"var(--t1)"}}>{new Set(filtered.map(c=>c.firm)).size}</b> firms</div>
    <div className="ch-tbl-wrap"><table className="tbl" style={{minWidth:1200}}><thead><tr>
      <th>FIRM</th><th>PLAN</th><th>SIZE</th><th>PRICE</th><th>TARGET</th><th>MAX LOSS</th><th>DLL</th><th>DRAWDOWN</th><th>MIN DAYS</th><th>SPLIT</th><th>PAYOUT</th><th>CONSISTENCY</th><th>NEWS</th><th>EAs</th>
    </tr></thead><tbody>{filtered.length===0?(
      <tr><td colSpan={14} style={{textAlign:"center",padding:40,color:"var(--t3)"}}>No challenges match your filters. Try removing some.</td></tr>
    ):filtered.map((c,i)=>{
      const f = getFirm(c.firm);
      return (
      <tr key={i}>
        <td><div style={{display:"flex",alignItems:"center",gap:8}}>{f&&<FirmLogo f={f} size={26}/>}<span style={{fontWeight:700,fontSize:12}}>{c.firm} <TopPickBadge name={c.firm}/></span></div></td>
        <td style={{fontSize:11,fontWeight:600}}>{c.plan}{c.instant&&<span style={{color:"var(--green)",marginLeft:4,fontSize:9}}>⚡</span>}</td>
        <td style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:"var(--brand2)"}}>${c.size}</td>
        <td style={{fontSize:11,fontWeight:600}}>{c.price}</td>
        <td style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{c.target}</td>
        <td style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{c.maxLoss}</td>
        <td style={{fontSize:11}}>{c.dll==="None"?<span style={{color:"var(--green)",fontWeight:700}}>None ✓</span>:<span style={{color:"var(--amber)"}}>{c.dll}</span>}</td>
        <td style={{fontSize:11}}>{c.drawdown}</td>
        <td style={{fontSize:11}}>{c.minDays==="None"?<span style={{color:"var(--green)"}}>None ✓</span>:c.minDays}</td>
        <td style={{fontSize:10}}>{c.split}</td>
        <td style={{fontSize:10}}>{c.payout}</td>
        <td style={{fontSize:11}}>{c.consistency==="None"?<span style={{color:"var(--green)",fontWeight:700}}>None ✓</span>:<span style={{color:"var(--amber)"}}>{c.consistency}</span>}</td>
        <td>{c.news?<span style={{color:"var(--green)"}}>✓</span>:<span style={{color:"var(--red)"}}>✕</span>}</td>
        <td>{c.ea?<span style={{color:"var(--green)"}}>✓</span>:<span style={{color:"var(--red)"}}>✕</span>}</td>
      </tr>);
    })}</tbody></table></div>
  </div>);
};

const ReviewsTab = () => (<div className="rev-grid">{REVIEWS.map(r=>(
  <div key={r.id} className="rev-c">
    <div className="rev-top"><span className="rev-user">{r.user}</span>{r.verified&&<span className="rev-v">✓ Verified</span>}</div>
    <div className="rev-firm">{r.firm}</div><div className="rev-stars">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
    <div className="rev-text">{r.text}</div><div className="rev-date">{r.date}</div>
  </div>
))}</div>);

const BlogTab = ({onSelect}) => (<div className="blog-grid">{BLOG.map(p=>(
  <div key={p.id} className="blog-c" onClick={()=>onSelect(p)} style={{cursor:"pointer"}}>
    <span className="blog-cat" style={{background:p.color+"12",color:p.color}}>{p.cat}</span>
    <div className="blog-t">{p.title}</div><div className="blog-ex">{p.excerpt}</div>
    <div className="blog-f"><span>{p.date}</span><span>{p.time} read</span></div>
  </div>
))}</div>);

const BlogPostPage = ({post,goBack}) => {
  if(!post) return null;
  const paras = post.body.split("\n\n");
  return (<div className="wrap" style={{maxWidth:720,margin:"0 auto"}}>
    <button className="det-back" onClick={goBack}>← Back to Blog</button>
    <div style={{marginTop:8}}>
      <span className="blog-cat" style={{background:post.color+"12",color:post.color,marginBottom:12,display:"inline-block"}}>{post.cat}</span>
      <h1 style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:28,fontWeight:800,lineHeight:1.3,margin:"8px 0 12px",letterSpacing:"-.5px"}}>{post.title}</h1>
      <div style={{display:"flex",alignItems:"center",gap:12,fontSize:12,color:"var(--t3)",marginBottom:28,paddingBottom:20,borderBottom:"1px solid var(--bdr)"}}>
        <span>ThePropPulse</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.time} read</span>
      </div>
      <div className="blog-body">
        {paras.map((p,i)=>{
          if(p.startsWith("**") && p.endsWith("**")) return <h2 key={i} className="blog-h2">{p.replace(/\*\*/g,"")}</h2>;
          if(p.startsWith("**")) {
            const parts = p.split("**");
            return <div key={i} className="blog-p">{parts.map((s,j)=>j%2===1?<strong key={j}>{s}</strong>:<span key={j}>{s}</span>)}</div>;
          }
          const formatted = p.split("**").map((s,j)=>j%2===1?<strong key={j}>{s}</strong>:<span key={j}>{s}</span>);
          return <p key={i} className="blog-p">{formatted}</p>;
        })}
      </div>
      <div style={{marginTop:36,padding:24,background:"var(--bg2)",border:"1px solid var(--bdr2)",borderRadius:14,textAlign:"center"}}>
        <div style={{fontSize:16,fontWeight:700,marginBottom:6}}>Ready to get funded?</div>
        <div style={{fontSize:13,color:"var(--t2)",marginBottom:14}}>Use code <b style={{color:"var(--brand2)",fontFamily:"'JetBrains Mono',monospace"}}>PULSE</b> at any firm for an exclusive discount.</div>
        <button className="gw-submit" style={{maxWidth:280,margin:"0 auto"}} onClick={goBack}>Compare All Firms →</button>
      </div>
    </div>
  </div>);
};

const GiveawaysTab = () => {
  const [form,setForm] = useState({name:"",email:"",firm:"",screenshot:"",notes:""});
  const [submitted,setSubmitted] = useState(false);
  const [entries,setEntries] = useState([]);
  const [loading,setLoading] = useState(true);

  // Load entries from storage on mount
  useState(()=>{
    (async()=>{
      try {
        const result = await window.storage.get("giveaway-entries");
        if(result && result.value) setEntries(JSON.parse(result.value));
      } catch(e){}
      setLoading(false);
    })();
  });

  const handleSubmit = async () => {
    if(!form.name||!form.email||!form.firm||!form.screenshot) return;
    const entry = {...form, id: Date.now(), date: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})};
    const updated = [...entries, entry];
    setEntries(updated);
    try { await window.storage.set("giveaway-entries", JSON.stringify(updated)); } catch(e){}
    setSubmitted(true);
    setForm({name:"",email:"",firm:"",screenshot:"",notes:""});
  };

  const firmNames = FIRMS.map(f=>f.name);

  if(submitted) return (
    <div className="gw-success">
      <div className="gw-success-icon">🎉</div>
      <h3>Entry Submitted!</h3>
      <p>You've been entered into this week's giveaway drawing. Winners are announced every Friday on our Discord & YouTube. Good luck!</p>
      <button className="ct-btn on" style={{marginTop:20}} onClick={()=>setSubmitted(false)}>Submit Another Entry</button>
    </div>
  );

  return (
    <div>
      <div className="gw-hero">
        <h2>Win a <em>Free Prop Firm Account</em></h2>
        <p>Buy any futures prop firm account using code PULSE and you're automatically entered to win a free account every week.</p>
      </div>

      <div className="gw-prize">
        <div className="gw-prize-label">🏆 This Week's Prize</div>
        <div className="gw-prize-title">Free 150K Funded Account</div>
        <div className="gw-prize-val">$150K</div>
        <div className="gw-prize-sub">Winner announced Friday at 5PM EST on Discord & YouTube</div>
      </div>

      <div className="gw-steps">
        <div className="gw-step">
          <div className="gw-step-num">01</div>
          <div className="gw-step-title">Purchase Any Account</div>
          <div className="gw-step-desc">Buy a challenge or funded account from any prop firm listed on ThePropPulse.</div>
        </div>
        <div className="gw-step">
          <div className="gw-step-num">02</div>
          <div className="gw-step-title">Use Code PULSE</div>
          <div className="gw-step-desc">Apply the code <b style={{color:"var(--brand2)"}}>PULSE</b> at checkout to get your discount and qualify.</div>
        </div>
        <div className="gw-step">
          <div className="gw-step-num">03</div>
          <div className="gw-step-title">Submit Your Proof</div>
          <div className="gw-step-desc">Upload a screenshot of your order confirmation showing code PULSE was applied.</div>
        </div>
        <div className="gw-step">
          <div className="gw-step-num">04</div>
          <div className="gw-step-title">Win Free Accounts</div>
          <div className="gw-step-desc">Each purchase = 1 entry. More purchases = more chances. Winners drawn every Friday.</div>
        </div>
      </div>

      <div className="gw-form">
        <h3>🎟️ Submit Your Entry</h3>
        <div className="gw-field">
          <label>Your Name</label>
          <input type="text" placeholder="e.g. John Smith" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        </div>
        <div className="gw-field">
          <label>Email Address</label>
          <input type="email" placeholder="e.g. john@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        </div>
        <div className="gw-field">
          <label>Which Firm Did You Purchase From?</label>
          <select value={form.firm} onChange={e=>setForm({...form,firm:e.target.value})}>
            <option value="">Select a firm...</option>
            {firmNames.map(n=><option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="gw-field">
          <label>Screenshot Link (Google Drive, Imgur, etc.)</label>
          <input type="url" placeholder="Paste a link to your order confirmation screenshot" value={form.screenshot} onChange={e=>setForm({...form,screenshot:e.target.value})}/>
        </div>
        <div className="gw-field">
          <label>Notes (Optional)</label>
          <textarea placeholder="Anything else you'd like to add..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
        </div>
        <button className="gw-submit" disabled={!form.name||!form.email||!form.firm||!form.screenshot} onClick={handleSubmit}>
          Submit Entry 🎉
        </button>
      </div>

      <div className="gw-rules">
        <h4>📋 Giveaway Rules</h4>
        <ul>
          <li>Purchase must be made through a prop firm listed on ThePropPulse</li>
          <li>Code PULSE must be applied at checkout (visible in screenshot)</li>
          <li>One entry per purchase — buying multiple accounts = multiple entries</li>
          <li>Screenshot must clearly show the order confirmation with the discount code</li>
          <li>Winners are selected randomly every Friday and announced on Discord & YouTube</li>
          <li>Prize accounts are subject to the winning firm's standard terms & conditions</li>
          <li>Entries from the current week (Mon–Sun) are eligible for that week's drawing</li>
          <li>ThePropPulse reserves the right to verify all entries before awarding prizes</li>
        </ul>
      </div>

      {entries.length > 0 && (
        <div className="gw-entries">
          <div className="gw-entries-hdr">
            <div className="section-title" style={{fontSize:16}}><span className="bar" style={{height:16}}/> Recent Entries</div>
            <span className="gw-entries-count">{entries.length} total entries</span>
          </div>
          <div style={{display:"grid",gap:8}}>
            {entries.slice(-5).reverse().map(e=>(
              <div key={e.id} style={{background:"var(--bg2)",border:"1px solid var(--bdr)",borderRadius:10,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <span style={{fontWeight:700,fontSize:13}}>{e.name}</span>
                  <span style={{color:"var(--t3)",fontSize:12,marginLeft:8}}>purchased from <b style={{color:"var(--t1)"}}>{e.firm}</b></span>
                </div>
                <span style={{fontSize:11,color:"var(--t4)"}}>{e.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── FIRM PROFILES (comprehensive detail data) ──────────────────────────────
const FIRM_PROFILES = {
  "Tradeify":{
    tagline:"Trade like a Champion with the Best Futures Prop Firm",
    description:"Tradeify is a futures-focused prop firm founded in 2022 by Brett Simba in Austin, TX. With the Tradeify 3.0 update (March 2026), all plans moved to one-time fees — no more subscriptions. New 25K accounts, Rithmic/TradeSea platform support, instant dashboard activations, integrated trading journal, and the Elite Live Performance Reward Pool (up to $90K in additional rewards) make this the biggest overhaul in the firm's history. Over $150M+ in verified payouts processed.",
    website:"tradeify.co",
    ceo:"Brett Simba",
    totalPayouts:"$150M+ verified",
    discordMembers:"30,000+",
    plans:["Select (Daily/Flex)","Growth","Lightning (Instant)","NEW: 25K accounts on Select & Growth"],
    accountSizes:"$25K, $50K, $100K, $150K (all plans now one-time fee)",
    profitSplit:"90/10 from first payout (Select Flex), 100% first $15K then 90/10 (Growth/Lightning)",
    drawdown:"End-of-Day Trailing — MLL: $1K(25K), $2K(50K), $3.5K(100K), $4.5K(150K) on Select. Lightning 150K: $5,250 (3.0 update). Locks at balance + $100.",
    payoutSpeed:"Same-day to 48 hours via Rise or Plane. Instant funded activation from dashboard (3.0)",
    payoutFreq:"Daily (Select Daily), Every 5 winning days (Select Flex), Per profit goal (Growth/Lightning)",
    activationFee:"$0 — No activation fees on any account",
    platforms:["Tradovate","NinjaTrader","Rithmic (NEW 3.0)","TradeSea (NEW 3.0)","TradingView","Quantower","WealthCharts"],
    instruments:"CME Group Futures (ES, NQ, YM, CL, GC, NQ Micro, etc.)",
    newsTrading:"Yes — no restrictions on news events",
    eaPolicy:"Yes — EAs/bots allowed with ownership verification",
    overnightHolds:"No — all positions must close by market close",
    consistencyRule:"40% (Select eval), None (Select Flex funded), 35% (Growth funded), 20→25→30% (Lightning progressive)",
    dailyLossLimit:"None on Select Flex | Select Daily: $500(25K)/$1K(50K)/$1.25K(100K)/$1.75K(150K) | Lightning: $1.25K(50K)/$2.5K(100K)/$3K(150K) — soft breach, removed at 6% profit | Growth: $600(25K)/$1.25K(50K)/$2.5K(100K)/$3.75K(150K)",
    scalingPlan:"Progressive contract scaling on funded Select accounts, starts reduced and scales with equity",
    livePath:"Tradeify Elite after 5 total payouts across all accounts — trade real CME capital with up to 5 live accounts",
    maxAccounts:"5 funded accounts simultaneously",
    pros:["All plans now ONE-TIME fees (3.0 — no more subscriptions)","Elite Live Performance Reward Pool up to $90K","Daily payout option","EOD trailing drawdown locks early","New 25K accounts for affordable entry","Rithmic & TradeSea platforms added (3.0)","Instant funded activation from dashboard","Integrated trading journal","News trading allowed","EAs permitted","Path to live capital via Elite"],
    cons:["Select funded starts with reduced contract limits (progressive scaling)","40% consistency rule on Select eval","Lightning 150K drawdown reduced to $5,250 in 3.0","~3% price increase across plans in 3.0"]
  },
  "Lucid Trading":{
    tagline:"The Best Prop Firm For Futures — Fast Payouts!",
    description:"Lucid Trading was founded by AJ Campanella in 2025 and quickly became one of the fastest-growing futures prop firms. Offers four account types: LucidFlex (no DLL, no consistency), LucidPro (3-day payouts), LucidDirect (instant funding), and LucidMaxx (invite-only live). All one-time fees, no subscriptions. $10M+ in payouts with 15-minute average processing.",
    website:"lucidtrading.com",
    ceo:"AJ Campanella",
    totalPayouts:"$10M+",
    discordMembers:"Active community",
    plans:["LucidFlex (Eval)","LucidPro (Eval)","LucidDirect (Instant)","LucidMaxx (Invite-only)"],
    accountSizes:"$25K, $50K, $100K, $150K (all plans now one-time fee)",
    profitSplit:"90/10 (Flex) | 100% first $10K then 90/10 (Pro/Direct) | 80/20 (LucidLive)",
    drawdown:"End-of-Day Trailing — MLL: $1K(25K), $2K(50K), $3K(100K), $4.5K(150K)",
    payoutSpeed:"Average 15 minutes via ACH/Plaid — fastest in the industry",
    payoutFreq:"Every 5 profitable days (Flex) | Every 3 days (Pro) | Every 8 days (Direct)",
    activationFee:"$0 — One-time purchase, no monthly fees",
    platforms:["NinjaTrader","Tradovate","Rithmic","Quantower","Bookmap","R|Trader","TradingView","Sierra Chart","ATAS"],
    instruments:"CME Group Futures (ES, NQ, YM, RTY, CL, GC, SI, HG, ZB, ZN, etc.)",
    newsTrading:"Yes — fully allowed during economic releases",
    eaPolicy:"Yes — algorithmic strategies permitted. HFT bots are prohibited.",
    overnightHolds:"No on sim-funded (must close by 4:45 PM EST) | Yes on LucidLive",
    consistencyRule:"50% (Flex eval) | 35% (Pro funded) | 20% (Direct) | None (Flex funded, Maxx)",
    dailyLossLimit:"None on Flex | Yes on Pro | Soft breach on Direct ($600-$2,700 by size)",
    scalingPlan:"LucidFlex uses profit-based scaling (starts 2 minis on 50K, scales to 4 at +$2K). Pro/Direct have full contracts from day one.",
    livePath:"LucidLive after 5-6 payouts (varies by plan) — $0 start + one-time bonus, 80/20 split, daily payouts, real capital",
    maxAccounts:"10 evaluations, 5 funded accounts per household",
    pros:["One-time fees — no subscriptions","LucidFlex: zero DLL + zero consistency rule (funded)","15-minute average payout processing","Widest platform selection (9+ platforms)","Path to live capital via LucidLive","100% profit on first $10K (Pro/Direct)"],
    cons:["Founded in 2025 — shorter track record","LucidFlex has scaling (starts with reduced contracts)","Direct pricing increased in Feb 2026","150K MLL reduced to $4,500"]
  },
  "My Funded Futures":{
    tagline:"The futures prop firm traders trust most",
    description:"My Funded Futures (MFFU) launched in 2023 and rapidly became the highest-rated futures prop firm on Trustpilot (4.9/5 from 16,800+ reviews). Offers Core, Scale, and Rapid plans with no daily loss limits. Static drawdown on funded accounts locks early. Most payout requests approved instantly.",
    website:"myfundedfutures.com",
    ceo:"Matthew Leech",
    totalPayouts:"$25M+ reported",
    discordMembers:"Active Discord + live chat",
    plans:["Core","Scale","Rapid"],
    accountSizes:"$50K, $100K, $150K",
    profitSplit:"80/20 (Core/Scale) | 90/10 (Rapid) | Static drawdown locks at starting balance + $100",
    drawdown:"EOD Trailing (eval) → Static once funded (locks at balance + $100). Rapid uses intraday trailing.",
    payoutSpeed:"Most approved instantly — 6-12 hours if manual review needed",
    payoutFreq:"Every 5 winning days (Core) | Weekly (Scale) | Daily (Rapid)",
    activationFee:"$0 — No activation fees",
    platforms:["NinjaTrader","Tradovate","Rithmic","TradingView","+6"],
    instruments:"CME, CBOT, COMEX, NYMEX Futures",
    newsTrading:"Restricted — must be flat 2 min before/after Tier 1 events (FOMC, NFP, etc.)",
    eaPolicy:"Yes — automated trading generally permitted",
    overnightHolds:"Yes — overnight holds allowed on all plans",
    consistencyRule:"40% on Core/Scale funded accounts | None on Rapid",
    dailyLossLimit:"None — no DLL on any plan",
    scalingPlan:"Scale plan increases payout caps with each consecutive payout ($1,500→$3,500 for 50K)",
    livePath:"Live account after 5 consecutive payouts on any plan",
    maxAccounts:"Multiple accounts allowed",
    pros:["No daily loss limit on any plan","4.9/5 Trustpilot — highest rated futures prop firm","Static drawdown locks early on funded","Instant payout approvals","No activation fees","Rapid plan offers daily payouts"],
    cons:["Monthly subscription model (not one-time)","Core split is 80/20 (lower than competitors)","Rapid uses intraday trailing drawdown","Payout caps on Core/Scale"]
  },
  "Alpha Futures":{
    tagline:"Empowering traders with fair and transparent funding",
    description:"Alpha Futures launched in July 2024 as a sister company of Alpha Capital Group (forex). UK-based with CEO Ben Chaffee actively involved in their Discord. Rated 4.9/5 on Trustpilot. Offers Standard, Advanced, and Zero evaluation types with no hard daily loss limit — uses a soft 'Daily Loss Guard' instead.",
    website:"alpha-futures.com",
    ceo:"Ben Chaffee",
    totalPayouts:"Growing rapidly",
    discordMembers:"Active with CEO participation",
    plans:["Standard","Advanced","Zero"],
    accountSizes:"$50K, $100K, $150K",
    profitSplit:"70% (payouts 1-2) → 80% (payouts 3-4) → 90% (payout 5+)",
    drawdown:"EOD Trailing — $2,500(50K), $3,500(100K), $4,500(150K)",
    payoutSpeed:"Within 48 business hours — Advanced gets weekly processing",
    payoutFreq:"Bi-weekly (Standard) | Weekly (Advanced) | After buffer (Zero)",
    activationFee:"$149 activation on Standard | Varies by plan",
    platforms:["NinjaTrader","Tradovate","TradingView","AlphaTicks (Quantower)"],
    instruments:"CME Group Futures — equities, forex, commodities, rates",
    newsTrading:"Yes — no restrictions on news events",
    eaPolicy:"No — EAs, bots, and automated trading are prohibited. Semi-auto with active supervision may be allowed.",
    overnightHolds:"No — no overnight or weekend positions",
    consistencyRule:"50% during evaluation only — no funded consistency rule",
    dailyLossLimit:"Soft 'Daily Loss Guard' — pauses trading for the day, does NOT fail the account",
    scalingPlan:"No scaling plan — max allocation is the chosen account size (50K-150K)",
    livePath:"Path to live trading available after consistent performance",
    maxAccounts:"Multiple accounts allowed",
    pros:["4.9/5 Trustpilot rating","Soft DLL (won't fail your account)","No funded consistency rule","CEO active in Discord","Cheapest entry at $79/mo for 50K"],
    cons:["EAs/bots completely prohibited","Profit split starts at 70% (increases to 90% over time)","Monthly subscription model","Limited platform selection","No scaling beyond chosen account size","Activation fee on Standard"]
  },
  "Apex Trader Funding":{
    tagline:"Trade Futures. Keep 100% of the First $25,000.",
    description:"Apex Trader Funding launched in 2021 by Darrell Martin in Austin, TX. One of the largest futures prop firms with $660M+ in total payouts. Offers accounts from $25K to $300K with 100% profit on first $25K. Major rule overhaul in March 2026 eliminated MAE, monthly fees, and video review requirements.",
    website:"apextraderfunding.com",
    ceo:"Darrell Martin",
    totalPayouts:"$660M+",
    discordMembers:"Large community",
    plans:["Full (EOD)","Full (Intraday Trailing)","Static ($100K only)"],
    accountSizes:"$25K, $50K, $75K, $100K, $150K, $250K, $300K",
    profitSplit:"100% of first $25K, then 90/10 — no cap on maximum payout",
    drawdown:"Choose: EOD Trailing OR Intraday Trailing. Static option on $100K only.",
    payoutSpeed:"Approved end of day, funds within 3-4 business days",
    payoutFreq:"Flexible — request anytime after 5 trading days",
    activationFee:"$130-$160 depending on account (one-time)",
    platforms:["Rithmic (+ NinjaTrader license included)","Tradovate","WealthCharts"],
    instruments:"CME, CBOT, NYMEX, COMEX Futures (46 markets)",
    newsTrading:"Yes — permitted for normal strategies. 'Windfall' exploitation prohibited.",
    eaPolicy:"Yes — automated trading and DCA allowed with monitoring",
    overnightHolds:"No — positions must close by session end",
    consistencyRule:"50% on funded accounts (March 2026 update, loosened from 30%)",
    dailyLossLimit:"None — no daily loss limit",
    scalingPlan:"Up to 20 Performance Accounts simultaneously. Half contracts until trailing threshold cleared.",
    livePath:"After 6 payouts, account closes. Restart evaluation for new account.",
    maxAccounts:"Up to 20 accounts simultaneously",
    pros:["100% of first $25K profits","Largest account sizes (up to $300K)","Up to 20 simultaneous accounts","No daily loss limit","March 2026 overhaul removed many restrictions","$660M+ verified payouts"],
    cons:["One-time fee + activation fee adds up","6 payouts then account closes","Intraday trailing can be aggressive","50% consistency rule on funded","Payout caps per cycle","Complex rule history"]
  },
  "Top One Futures":{
    tagline:"Top-tier futures prop trading",
    description:"Top One Futures launched in 2024 in Miami, FL. Offers evaluation and Prime (instant funding) accounts with competitive pricing. Known for aggressive discount promotions. Growing rapidly with 3,000+ Trustpilot reviews.",
    website:"toponetrader.com",
    ceo:"Leadership team",
    totalPayouts:"Growing",
    discordMembers:"Active community",
    plans:["Eval (1-Step)","Prime (Instant Funding)"],
    accountSizes:"$25K, $50K, $100K, $150K",
    profitSplit:"90/10",
    drawdown:"EOD Trailing",
    payoutSpeed:"Processed within a few business days",
    payoutFreq:"After 5 trading days",
    activationFee:"$0 on Eval | Included in Prime pricing",
    platforms:["NinjaTrader","Tradovate","TradingView"],
    instruments:"CME Group Futures",
    newsTrading:"Yes — allowed",
    eaPolicy:"Yes — automated trading permitted",
    overnightHolds:"No — intraday only",
    consistencyRule:"30% — strictest consistency in the space",
    dailyLossLimit:"Yes — $1,000(50K), $2,000(100K)",
    scalingPlan:"Account scaling available with consistent performance",
    livePath:"Path to live trading after proven track record",
    maxAccounts:"Multiple accounts allowed",
    pros:["Frequent massive discounts (60%+ off)","Instant funding via Prime","One-time fees (no subscriptions)","90/10 split from start"],
    cons:["30% consistency rule is very strict","Daily loss limit applies","Newer firm (2024)","Some negative reviews about consistency rule denials"]
  },
  "FundedNext Futures":{
    tagline:"The future of prop trading",
    description:"FundedNext is a Dubai-based prop firm (est. 2022) that expanded from forex to futures. Has the most Trustpilot reviews of any prop firm (63,000+) due to their combined forex+futures presence. $261M+ in verified payouts via Payout Junction. Offers one-time fee Rapid and Legacy challenges.",
    website:"fundednext.com",
    ceo:"Leadership team",
    totalPayouts:"$261M+ verified",
    discordMembers:"Large global community",
    plans:["Rapid (1-Step)","Legacy (2-Step)"],
    accountSizes:"$50K, $100K, $150K, $200K",
    profitSplit:"80/20 starting, scales to 95/5 with consistent performance",
    drawdown:"EOD Trailing",
    payoutSpeed:"Guaranteed within 24 hours — $1,000 penalty if missed",
    payoutFreq:"After meeting profit target per cycle",
    activationFee:"$0 — no activation fees, one-time challenge fee only",
    platforms:["NinjaTrader","Tradovate","TradingView"],
    instruments:"CME Group Futures",
    newsTrading:"Yes — no restrictions on economic news",
    eaPolicy:"Yes — automated trading fully allowed",
    overnightHolds:"No — positions must close intraday",
    consistencyRule:"None — no consistency rule",
    dailyLossLimit:"Yes — varies by account size",
    scalingPlan:"Profit split scales from 80/20 up to 95/5 over time",
    livePath:"Scaling path to larger allocations",
    maxAccounts:"Multiple accounts allowed",
    pros:["One-time fee (no subscriptions)","No consistency rule","24-hour guaranteed payout","Profit split scales to 95/5","No time limits on challenges","$261M+ verified payouts"],
    cons:["80/20 starting split is lower than competitors","Daily loss limit applies","Newer to futures (primarily forex)","Some complaints about payout denials in 2025-2026"]
  },
  "Topstep":{
    tagline:"The original futures prop firm since 2012",
    description:"Topstep is the OG futures prop firm, founded in 2012 in Chicago. NFA registered with their own brokerage (TopStep Brokerage LLC). 12+ years of operation, featured in Forbes and MarketWatch. Transitioned to proprietary TopstepX platform. 100% of first $10K in profits, then 90/10.",
    website:"topstep.com",
    ceo:"Michael Patak",
    totalPayouts:"Tens of millions",
    discordMembers:"86,000+ Discord members",
    plans:["Trading Combine"],
    accountSizes:"$50K, $100K, $150K",
    profitSplit:"100% of first $10,000, then 90/10",
    drawdown:"EOD — drawdown calculated at end of trading day only",
    payoutSpeed:"1-3 business days — processed weekly",
    payoutFreq:"Weekly payouts",
    activationFee:"$0 — included in monthly subscription",
    platforms:["TopstepX (proprietary)","NinjaTrader","Quantower","TradingView"],
    instruments:"CME Group Futures — 32 markets",
    newsTrading:"Yes — allowed",
    eaPolicy:"Yes — automated trading permitted on TopstepX and supported platforms",
    overnightHolds:"No — must close by session end",
    consistencyRule:"50% — best single day cannot exceed 50% of total profits",
    dailyLossLimit:"Removed on TopstepX (Aug 2024) | Still applies on NinjaTrader/Quantower",
    scalingPlan:"No traditional scaling — consistent accounts eligible for live transition",
    livePath:"Express Funded → Live account transition with real CME capital",
    maxAccounts:"Multiple accounts allowed",
    pros:["12+ years of operation — most established firm","NFA registered brokerage","100% of first $10K","Cheapest entry ($49/mo for 50K)","86,000+ Discord community","Educational resources and TopstepTV"],
    cons:["3.4/5 Trustpilot (profile merges brought rating down)","Forced TopstepX platform transition","50% consistency rule","Complex rule changes over the years","DLL varies by platform used"]
  },
  "Take Profit Trader":{
    tagline:"We fund futures traders",
    description:"Take Profit Trader (TPT) launched in 2022 in Orlando, FL. Known for daily payouts from day one on PRO+ accounts and exceptional customer support (24/5 live chat). No minimum trading days to pass evaluation. Path to live PRO+ accounts with 90/10 split.",
    website:"takeprofittrader.com",
    ceo:"Leadership team",
    totalPayouts:"Millions processed",
    discordMembers:"Active community",
    plans:["Eval (1-Step)"],
    accountSizes:"$25K, $50K, $75K, $100K, $150K",
    profitSplit:"80/20 (PRO) → 90/10 (PRO+) — daily payouts on PRO+",
    drawdown:"EOD Trailing",
    payoutSpeed:"Same day on PRO+ accounts — daily processing",
    payoutFreq:"Daily on PRO+ | After buffer on PRO",
    activationFee:"$130 one-time PRO activation fee (replaces monthly subscription)",
    platforms:["NinjaTrader","Tradovate","TradingView","Quantower","+10"],
    instruments:"CME Group Futures",
    newsTrading:"Restricted — must be flat 1 min before/after FOMC and NFP. Specific instruments restricted during related events.",
    eaPolicy:"No — trading bots and automated algorithms are strictly forbidden per TOS",
    overnightHolds:"No — must close all positions by 4:10 PM EST",
    consistencyRule:"50% — no single day can exceed 50% of total net profits (eval). No funded consistency rule.",
    dailyLossLimit:"None — DLL removed January 2025 for all new Test and PRO accounts",
    scalingPlan:"PRO → PRO+ progression with increasing profit splits and daily payouts",
    livePath:"PRO+ accounts with 90/10 split and daily payout access",
    maxAccounts:"Multiple accounts allowed",
    pros:["Daily payouts on PRO+","No minimum trading days","Strong customer support (24/5 live)","Wide platform support (15+)","DLL removed (Jan 2025) — no daily loss limit","Path to 90/10 daily payouts"],
    cons:["DLL is strict on smaller accounts ($500 on 25K)","40% consistency rule","80/20 starting split before PRO+","One-time fee pricing higher than some competitors"]
  },
  "Bulenox":{
    tagline:"Low-cost futures funding with weekly payouts",
    description:"Bulenox launched in 2022 and is registered in Delaware. Known for the lowest evaluation pricing, widest platform support (18+), and explicitly allowing EAs/bots/copy trading. Weekly payouts on Wednesdays. Choose between EOD or Trailing drawdown. 100% of first $10K in profits.",
    website:"bulenox.com",
    ceo:"Leadership team",
    totalPayouts:"Verified payouts",
    discordMembers:"Growing community",
    plans:["Qualification (1-Step)"],
    accountSizes:"$25K, $50K, $100K, $150K, $250K",
    profitSplit:"100% of first $10,000, then 90/10",
    drawdown:"Choose: EOD Trailing OR Intraday Trailing — your choice at purchase",
    payoutSpeed:"Processed weekly on Wednesdays",
    payoutFreq:"Weekly (every Wednesday)",
    activationFee:"$0 on one-time fee plans",
    platforms:["NinjaTrader","Tradovate","R|Trader Pro","Sierra Chart","Bookmap","Quantower","ATAS","Jigsaw","Motive Wave","+9"],
    instruments:"CME Group Futures + Micro Bitcoin (rare for prop firms)",
    newsTrading:"Yes — allowed",
    eaPolicy:"Yes — explicitly allows EAs, bots, algorithms, and trade copiers on all accounts",
    overnightHolds:"No — must close intraday",
    consistencyRule:"40% — applies at payout time, not during qualification",
    dailyLossLimit:"Yes — $500(25K), $1,100(50K), $2,000(100K), $2,200(150K), $2,500(250K)",
    scalingPlan:"Three-tier: Qualification → Master Account (sim-funded) → Funded Account (live capital after 3 payouts)",
    livePath:"Real capital after 3 successful withdrawals on Master Account",
    maxAccounts:"Up to 11 funded accounts",
    pros:["Lowest evaluation pricing in the industry","100% of first $10K profits","18+ platform support — widest selection","Explicitly allows EAs/bots/copy trading","Choose your drawdown type","Weekly payouts","Crypto futures (Micro Bitcoin)"],
    cons:["40% consistency rule at payout","Flipping policy can deny payouts","DLL is relatively strict","Payout caps on first 3 withdrawals","Reserve buffer requirement"]
  }
};

const DetailPage = ({firm,goBack}) => {
  if(!firm) return null;
  const deal = DEALS.find(d=>d.firm===firm.name);
  const revs = REVIEWS.filter(r=>r.firm===firm.name);
  const profile = FIRM_PROFILES[firm.name];
  const firmChallenges = CHALLENGES.filter(c=>c.firm===firm.name);
  const pulse = calcPulse(firm.rating,firm.reviews,firm.name);

  const SectionTitle = ({icon,children}) => (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,marginTop:28}}>
      <span style={{fontSize:18}}>{icon}</span>
      <h3 style={{fontSize:16,fontWeight:800,fontFamily:"'Plus Jakarta Sans',sans-serif",margin:0}}>{children}</h3>
    </div>
  );

  const InfoRow = ({label,value,highlight}) => (
    <div className="info-row">
      <span className="info-label">{label}</span>
      <span className={`info-val${highlight?" hl":""}`}>{value}</span>
    </div>
  );

  return (<div className="wrap det">
    <button className="det-back" onClick={goBack}>← Back to All Firms</button>

    {/* Hero */}
    <div className="det-hero">
      <FirmLogo f={firm} size={64}/>
      <div style={{flex:1}}>
        <div className="det-name" style={{color:firm.color}}>{firm.name} <TopPickBadge name={firm.name}/></div>
        <div className="det-sub">{firm.flag} {firm.hq} · Est. {firm.founded} · <a href={"https://"+profile?.website} target="_blank" rel="noopener" style={{color:"var(--brand2)"}}>{profile?.website}</a></div>
        <div style={{display:"flex",alignItems:"center",gap:12,marginTop:8,flexWrap:"wrap"}}>
          <div style={{background:"var(--bg2)",border:"1px solid var(--bdr2)",borderRadius:10,padding:"6px 14px",display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:11,color:"var(--t3)",fontWeight:600}}>Pulse Score</span>
            <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:20,fontWeight:800,color:pulseColor(pulse)}}>{pulse}</span>
          </div>
          <span className={`rat-badge ${ratClass(firm.rating)}`}>{firm.rating>0?firm.rating:"—"}</span>
          <span className="rat-stars" style={{fontSize:14}}>{"★".repeat(Math.floor(firm.rating))}</span>
          <span style={{fontSize:12,color:"var(--t3)"}}>{firm.reviews.toLocaleString()} Trustpilot reviews</span>
        </div>
      </div>
    </div>

    {/* Deal banner */}
    {deal&&<div className="det-deal" style={{marginTop:16}}>
      <span style={{fontSize:24,fontWeight:900,fontFamily:"'JetBrains Mono',monospace",color:deal.color}}>{deal.pct}</span>
      <div><span style={{color:"var(--t2)",fontSize:13}}>Use code </span><b style={{color:"var(--t1)",fontFamily:"'JetBrains Mono',monospace",fontSize:15}}>{deal.code}</b></div>
      <button className="act-btn" style={{marginLeft:"auto"}} onClick={()=>copyToClipboard(deal.code)}>📋 Copy Code</button>
    </div>}

    {profile ? <>
      {/* Tagline + Description */}
      <div className="det-desc" style={{marginTop:20}}>
        <div style={{fontStyle:"italic",color:"var(--brand2)",fontSize:14,marginBottom:8}}>"{profile.tagline}"</div>
        {profile.description}
      </div>

      {/* Quick Stats Grid */}
      <SectionTitle icon="📊">Quick Stats</SectionTitle>
      <div className="det-grid">
        {[["Account Sizes",profile.accountSizes],["Max Allocation",firm.maxAlloc],["Total Payouts",profile.totalPayouts],["Plans",profile.plans.join(", ")],["Platforms",profile.platforms.slice(0,4).join(", ")],["Founded",firm.founded+" · "+firm.hq]].map(([l,v])=>(
          <div className="det-stat" key={l}><div className="det-stat-l">{l}</div><div className="det-stat-v">{v}</div></div>
        ))}
      </div>

      {/* Payout Structure */}
      <SectionTitle icon="💰">Payout Structure</SectionTitle>
      <div className="det-section">
        <InfoRow label="Profit Split" value={profile.profitSplit} highlight/>
        <InfoRow label="Payout Speed" value={profile.payoutSpeed}/>
        <InfoRow label="Payout Frequency" value={profile.payoutFreq}/>
        <InfoRow label="Activation Fee" value={profile.activationFee}/>
        <InfoRow label="Path to Live" value={profile.livePath}/>
      </div>

      {/* Challenge Plans */}
      {firmChallenges.length>0&&<>
        <SectionTitle icon="🏆">Challenge Plans & Pricing</SectionTitle>
        <div className="ch-tbl-wrap"><table className="tbl" style={{minWidth:800}}><thead><tr>
          <th>PLAN</th><th>SIZE</th><th>PRICE</th><th>TARGET</th><th>MAX LOSS</th><th>DLL</th><th>CONSISTENCY</th><th>SPLIT</th><th>PAYOUT</th>
        </tr></thead><tbody>{firmChallenges.map((c,i)=>(
          <tr key={i}>
            <td style={{fontWeight:600,fontSize:12}}>{c.plan}{c.instant&&<span style={{color:"var(--green)",marginLeft:4}}>⚡</span>}</td>
            <td style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:"var(--brand2)"}}>${c.size}</td>
            <td style={{fontSize:12,fontWeight:600}}>{c.price}</td>
            <td style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{c.target}</td>
            <td style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{c.maxLoss}</td>
            <td style={{fontSize:11}}>{c.dll==="None"?<span style={{color:"var(--green)"}}>None ✓</span>:<span style={{color:"var(--amber)"}}>{c.dll}</span>}</td>
            <td style={{fontSize:11}}>{c.consistency==="None"?<span style={{color:"var(--green)"}}>None ✓</span>:<span style={{color:"var(--amber)"}}>{c.consistency}</span>}</td>
            <td style={{fontSize:11}}>{c.split}</td>
            <td style={{fontSize:11}}>{c.payout}</td>
          </tr>
        ))}</tbody></table></div>
      </>}

      {/* Trading Rules */}
      <SectionTitle icon="📋">Trading Rules</SectionTitle>
      <div className="det-section">
        <InfoRow label="Drawdown Type" value={profile.drawdown}/>
        <InfoRow label="Daily Loss Limit" value={profile.dailyLossLimit}/>
        <InfoRow label="Consistency Rule" value={profile.consistencyRule}/>
        <InfoRow label="News Trading" value={profile.newsTrading}/>
        <InfoRow label="EAs / Bots" value={profile.eaPolicy} highlight/>
        <InfoRow label="Overnight Holds" value={profile.overnightHolds}/>
        <InfoRow label="Scaling Plan" value={profile.scalingPlan}/>
        <InfoRow label="Max Accounts" value={profile.maxAccounts}/>
        <InfoRow label="Instruments" value={profile.instruments}/>
      </div>

      {/* Pros & Cons */}
      <div className="det-pros-cons">
        <div style={{background:"var(--bg2)",border:"1px solid var(--bdr)",borderRadius:12,padding:20}}>
          <h4 style={{color:"var(--green)",fontSize:14,fontWeight:700,marginBottom:10}}>✅ Pros</h4>
          {profile.pros.map((p,i)=><div key={i} style={{fontSize:12,color:"var(--t2)",padding:"4px 0",paddingLeft:14,position:"relative"}}><span style={{position:"absolute",left:0,color:"var(--green)"}}>+</span>{p}</div>)}
        </div>
        <div style={{background:"var(--bg2)",border:"1px solid var(--bdr)",borderRadius:12,padding:20}}>
          <h4 style={{color:"var(--amber)",fontSize:14,fontWeight:700,marginBottom:10}}>⚠️ Considerations</h4>
          {profile.cons.map((c,i)=><div key={i} style={{fontSize:12,color:"var(--t2)",padding:"4px 0",paddingLeft:14,position:"relative"}}><span style={{position:"absolute",left:0,color:"var(--amber)"}}>–</span>{c}</div>)}
        </div>
      </div>
    </>:<div className="det-desc">{firm.desc}</div>}

    {/* Reviews */}
    {revs.length>0&&<div style={{marginTop:28}}><SectionTitle icon="💬">Trader Reviews</SectionTitle><div className="rev-grid">{revs.map(r=>(
      <div key={r.id} className="rev-c"><div className="rev-top"><span className="rev-user">{r.user}</span>{r.verified&&<span className="rev-v">✓ Verified</span>}</div>
        <div className="rev-stars">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div><div className="rev-text">{r.text}</div><div className="rev-date">{r.date}</div></div>
    ))}</div></div>}
  </div>);
};

const Footer = ({setPage,setTab}) => (
  <footer className="foot"><div className="foot-in">
    <div className="foot-br"><div className="foot-n"><span style={{color:"var(--brand2)"}}>⚡</span> ThePropPulse</div><div className="foot-d">Your futures prop firm command center. Compare, track, and find the right firm.</div></div>
    <div className="foot-c"><h4>Platform</h4><a onClick={()=>{setPage("home");setTab("firms")}}>Firms</a><a onClick={()=>{setPage("home");setTab("challenges")}}>Challenges</a><a onClick={()=>{setPage("home");setTab("offers")}}>Offers</a><a onClick={()=>{setPage("home");setTab("giveaways")}}>Giveaways</a><a onClick={()=>{setPage("home");setTab("reviews")}}>Reviews</a></div>
    <div className="foot-c"><h4>Resources</h4><a onClick={()=>{setPage("home");setTab("blog")}}>Blog</a><a>Education</a><a>FAQ</a></div>
    <div className="foot-c"><h4>Company</h4><a>About</a><a>Contact</a><a>Privacy</a><a>Terms</a></div>
  </div><div className="foot-b">© 2026 ThePropPulse.com — Not financial advice. Data for informational purposes only.</div></footer>
);

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage] = useState("home");
  const [tab,setTab] = useState("firms");
  const [view,setView] = useState("table");
  const [sort,setSort] = useState("pulse");
  const [sf,setSF] = useState(null);
  const [blogPost,setBlogPost] = useState(null);

  const sorted = useMemo(()=>{
    const a=[...FIRMS];
    if(sort==="pulse") a.sort((x,y)=>calcPulse(y.rating,y.reviews,y.name)-calcPulse(x.rating,x.reviews,x.name));
    if(sort==="rating") a.sort((x,y)=>y.rating-x.rating);
    if(sort==="newest") a.sort((x,y)=>y.founded-x.founded);
    if(sort==="alloc") a.sort((x,y)=>allocPct(y.maxAlloc)-allocPct(x.maxAlloc));
    return a;
  },[sort]);

  const goDetail=(f)=>{setSF(f);setPage("detail");window.scrollTo({top:0,behavior:"smooth"})};
  const goBack=()=>{setPage("home");window.scrollTo({top:0,behavior:"smooth"})};
  const goBlog=(p)=>{setBlogPost(p);setPage("blogpost");window.scrollTo({top:0,behavior:"smooth"})};
  const blogBack=()=>{setPage("home");setTab("blog");window.scrollTo({top:0,behavior:"smooth"})};

  if(page==="blogpost") return (<><style>{css}</style><div className="glow-bg"><div className="glow-orb-left"/><div className="glow-orb-right"/></div><div className="gradient-fade"/><div className="page-content"><Ticker/><NavBar tab={tab} setTab={setTab} setPage={setPage}/><BlogPostPage post={blogPost} goBack={blogBack}/><div style={{height:60}}/><Footer setPage={setPage} setTab={setTab}/></div></>);
  if(page==="detail") return (<><style>{css}</style><div className="glow-bg"><div className="glow-orb-left"/><div className="glow-orb-right"/></div><div className="gradient-fade"/><div className="page-content"><Ticker/><NavBar tab={tab} setTab={setTab} setPage={setPage}/><DetailPage firm={sf} goBack={goBack}/><Footer setPage={setPage} setTab={setTab}/></div></>);

  return (<><style>{css}</style>
    <div className="glow-bg"><div className="glow-orb-left"/><div className="glow-orb-right"/></div>
    <div className="gradient-fade"/>
    <div className="page-content">
    <Ticker/>
    <NavBar tab={tab} setTab={setTab} setPage={setPage}/>
    <div className="wrap">
      <div className="hero">
        <h1>Compare the Best <em>Futures</em><br/><em>Prop Firms</em> of 2026</h1>
        <p>Track deals, compare challenges, and read verified reviews — all in one place. Built by traders, for traders.</p>
        <div className="hero-nums">
          <div className="hero-num"><b>10+</b><small>Verified Firms</small></div>
          <div className="hero-num"><b>50+</b><small>Challenges</small></div>
          <div className="hero-num"><b>6K+</b><small>Trader Reviews</small></div>
          <div className="hero-num"><b>$0</b><small>Always Free</small></div>
        </div>
      </div>

      <OffersStrip/>

      <div className="content-tabs">
        {[["firms","Firms"],["challenges","Challenges"],["offers","Offers"],["giveaways","🎟️ Giveaways"],["reviews","Reviews"],["blog","Blog"]].map(([k,l])=>(
          <button key={k} className={`ct-btn ${tab===k?"on":""}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>

      {tab==="firms"&&<>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:14}}>
          <div className="filters-row" style={{marginBottom:0}}>
            <button className={`f-btn ${sort==="pulse"?"on":""}`} onClick={()=>setSort("pulse")}>⚡ Pulse Score</button>
            <button className={`f-btn ${sort==="rating"?"on":""}`} onClick={()=>setSort("rating")}>★ Top Rated</button>
            <button className={`f-btn ${sort==="newest"?"on":""}`} onClick={()=>setSort("newest")}>🆕 Newest</button>
            <button className={`f-btn ${sort==="alloc"?"on":""}`} onClick={()=>setSort("alloc")}>💰 Highest Alloc.</button>
          </div>
          <div className="view-toggle">
            <button className={`vt-btn ${view==="table"?"on":""}`} onClick={()=>setView("table")}>☰ Table</button>
            <button className={`vt-btn ${view==="cards"?"on":""}`} onClick={()=>setView("cards")}>▦ Cards</button>
          </div>
        </div>
        {view==="table"?<FirmTable firms={sorted} onSelect={goDetail}/>:<FirmCards firms={sorted} onSelect={goDetail}/>}
      </>}
      {tab==="challenges"&&<ChallengesTab/>}
      {tab==="offers"&&<OffersPage/>}
      {tab==="giveaways"&&<GiveawaysTab/>}
      {tab==="reviews"&&<ReviewsTab/>}
      {tab==="blog"&&<BlogTab onSelect={goBlog}/>}
    </div>
    <div style={{height:60}}/>
    <Footer setPage={setPage} setTab={setTab}/>
    </div>
  </>);
}
