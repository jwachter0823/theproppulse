import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lwwtosuwfdliahoyqakx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3d3Rvc3V3ZmRsaWFob3lxYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDM0NDYsImV4cCI6MjA5MTMxOTQ0Nn0.RCcNmkTsgjInRlL3PwK2AP5bUUTx5G3f2XqYu0OrquU"
);

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
  { id:1, name:"Tradeify", initials:"T", logoUrl:"https://www.google.com/s2/favicons?domain=tradeify.co&sz=128", founded:2021, rating:4.7, reviews:2437, pulse:94, trend:"up", maxAlloc:"$750K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","Rithmic","TradeSea"], challenge:"Straight to Funded", steps:0, split:"80/20 → 90/10", target:"N/A", dailyDD:"$2,250", maxDD:"$3,500", minPayout:"$250", paySpeed:"1–3 days", reset:"$99", hq:"Austin, TX", color:"#0ea5e9", brandGrad:"linear-gradient(135deg,#0ea5e9,#0284c7)", desc:"Fast-growing futures prop firm with their signature Straight-to-Funded model. No evaluation required — get funded immediately and start trading. Known for rapid payouts and trader-friendly drawdown rules.", instantFund:true, sizes:["25K","50K","100K","150K"], payoutType:"Daily / 5-Day / Per Goal", minDaysPass:"1 day (Lightning) / 3 (Select)", drawdownType:"EOD Trailing", hasDLL:false, hasConsistency:true, consistencyPct:"20–40%", newsTrading:true, eaAllowed:true, bestFor:"Editor's Pick" },
  { id:2, name:"My Funded Futures", initials:"MFF", logoUrl:"https://www.google.com/s2/favicons?domain=myfundedfutures.com&sz=128", founded:2023, rating:4.9, reviews:16890, pulse:91, trend:"up", maxAlloc:"$450K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","Rithmic","+4"], challenge:"1-Step Eval", steps:1, split:"80/20 (Core/Pro) → 90/10 (Rapid)", target:"$3,000–$9,000", dailyDD:"None", maxDD:"$2,000–$4,500", minPayout:"$250", paySpeed:"Instant–24 hrs", reset:"$99", hq:"Dallas, TX", color:"#a855f7", brandGrad:"linear-gradient(135deg,#a855f7,#7c3aed)", desc:"Highest-rated futures prop firm (4.9/5). Three plans: Core (cheapest, 80/20), Rapid (daily payouts, 90/10, intraday trailing), Pro (no consistency, bi-weekly). Zero activation fees on all plans.", instantFund:false, sizes:["50K","100K","150K"], payoutType:"Varies by Plan", minDaysPass:"2 days", drawdownType:"EOD (Core/Pro) / Intraday (Rapid)", hasDLL:false, hasConsistency:true, consistencyPct:"40% (Core funded)", newsTrading:false, eaAllowed:true, bestFor:"Highest Rated" },
  { id:3, name:"Alpha Futures", initials:"AF", logoUrl:"https://www.google.com/s2/favicons?domain=alphafutures.io&sz=128", founded:2023, rating:4.9, reviews:3320, pulse:88, trend:"up", maxAlloc:"$500K", country:"GB", flag:"🇬🇧", platforms:["NinjaTrader","Tradovate","TradingView"], challenge:"1-Step Eval", steps:1, split:"100% first $15K → 90/10", target:"$5,000", dailyDD:"$1,500", maxDD:"$3,000", minPayout:"$250", paySpeed:"1–3 days", reset:"$85", hq:"London, UK", color:"#8b5cf6", brandGrad:"linear-gradient(135deg,#8b5cf6,#6d28d9)", desc:"UK-based futures prop firm with generous first-payout rules. 100% profit on your first $15K with only 3 minimum trading days required.", instantFund:false, sizes:["50K","100K","150K"], payoutType:"Bi-Weekly", minDaysPass:"1–2 days", drawdownType:"EOD Trailing", hasDLL:false, hasConsistency:true, consistencyPct:"50% (Eval)", newsTrading:true, eaAllowed:false, bestFor:"Most Transparent" },
  { id:4, name:"Apex Trader Funding", initials:"ATF", logoUrl:"https://www.google.com/s2/favicons?domain=apextraderfunding.com&sz=128", founded:2021, rating:4.4, reviews:18070, pulse:82, trend:"flat", maxAlloc:"$3M (20 accts)", country:"US", flag:"🇺🇸", platforms:["Rithmic","Tradovate","WealthCharts"], challenge:"1-Step Eval", steps:1, split:"100% first $25K → 90/10", target:"$6,000", dailyDD:"$1,500 (EOD only)", maxDD:"$3,000", minPayout:"$500", paySpeed:"3–5 days", reset:"N/A (rebuy)", hq:"Austin, TX", color:"#f97316", brandGrad:"linear-gradient(135deg,#f97316,#ea580c)", desc:"The largest futures prop firm by volume with $720M+ in payouts. Completely rebuilt with 4.0 (March 2026): one-time fees, EOD drawdown option, simplified rules, 6-payout cap per PA. Metals suspended, overnight banned.", instantFund:false, sizes:["25K","50K","100K","150K"], payoutType:"After 5 Qualifying Days", minDaysPass:"1 day", drawdownType:"EOD Trailing / Intraday Trailing", hasDLL:true, hasConsistency:true, consistencyPct:"50% (funded only)", newsTrading:true, eaAllowed:true, bestFor:"Most Accounts (20)" },
  { id:5, name:"Top One Futures", initials:"T1", logoUrl:"https://www.google.com/s2/favicons?domain=toponefutures.com&sz=128", founded:2024, rating:4.7, reviews:3041, pulse:87, trend:"up", maxAlloc:"$2.6M", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","TradingView"], challenge:"1-Step Eval", steps:1, split:"90/10", target:"$5,000", dailyDD:"$1,500", maxDD:"$2,500", minPayout:"$300", paySpeed:"1–3 days", reset:"$90", hq:"Miami, FL", color:"#06b6d4", brandGrad:"linear-gradient(135deg,#06b6d4,#0891b2)", desc:"Rapidly growing with one of the highest max allocations in futures. Competitive rules and a strong trader community.", instantFund:true, sizes:["25K","50K","100K","150K"], payoutType:"Varies by Plan", minDaysPass:"1 day", drawdownType:"EOD Trailing", hasDLL:true, hasConsistency:true, consistencyPct:"Varies", newsTrading:true, eaAllowed:true, bestFor:"Best Instant Fund" },
  { id:6, name:"FundedNext Futures", initials:"FN", logoUrl:"https://www.google.com/s2/favicons?domain=fundednext.com&sz=128", founded:2022, rating:4.4, reviews:63192, pulse:79, trend:"flat", maxAlloc:"$700K", country:"AE", flag:"🇦🇪", platforms:["NinjaTrader","Tradovate","TradingView"], challenge:"1-Step Eval", steps:1, split:"80/20 → 90/10", target:"$5,000", dailyDD:"$1,200", maxDD:"$2,500", minPayout:"$500", paySpeed:"3–5 days", reset:"$95", hq:"Dubai, UAE", color:"#06b6d4", brandGrad:"linear-gradient(135deg,#06b6d4,#0891b2)", desc:"Part of the FundedNext ecosystem, now offering futures. Backed by one of the most recognized brands in prop trading.", instantFund:false, sizes:["50K","100K","150K","200K"], payoutType:"Within 24 Hours", minDaysPass:"No minimum", drawdownType:"EOD Trailing", hasDLL:true, hasConsistency:false, consistencyPct:"None", newsTrading:true, eaAllowed:true, bestFor:"No Consistency" },
  { id:7, name:"Lucid Trading", initials:"LT", logoUrl:"https://www.google.com/s2/favicons?domain=lucidtrading.com&sz=128", founded:2024, rating:4.8, reviews:2710, pulse:72, trend:"new", maxAlloc:"$750K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","Bookmap","+8"], challenge:"1-Step Eval", steps:1, split:"80/20 → 90/10", target:"$4,000", dailyDD:"$1,000", maxDD:"$2,000", minPayout:"$500", paySpeed:"3–5 days", reset:"$75", hq:"New York, NY", color:"#14b8a6", brandGrad:"linear-gradient(135deg,#14b8a6,#0d9488)", desc:"The newest entrant in the futures prop space. Building their reputation through competitive pricing and transparent operations.", instantFund:true, sizes:["25K","50K","100K","150K"], payoutType:"5-Day (Pro) / 8-Day (Direct)", minDaysPass:"1 day", drawdownType:"EOD Trailing", hasDLL:false, hasConsistency:false, consistencyPct:"None (Flex)", newsTrading:true, eaAllowed:true, bestFor:"Fastest Payouts" },
  { id:8, name:"Topstep", initials:"TS", logoUrl:"https://www.google.com/s2/favicons?domain=topstep.com&sz=128", founded:2012, rating:3.4, reviews:13746, pulse:85, trend:"flat", maxAlloc:"$750K", country:"US", flag:"🇺🇸", platforms:["TopstepX","NinjaTrader","Tradovate","Quantower","R Trader Pro"], challenge:"Trading Combine", steps:1, split:"90/10", target:"$6,000", dailyDD:"Tier-based", maxDD:"$3,000", minPayout:"$200", paySpeed:"3–7 days", reset:"$49–$149", hq:"Chicago, IL", color:"#6366f1", brandGrad:"linear-gradient(135deg,#6366f1,#4f46e5)", desc:"The original futures prop firm, operating since 2012. Pioneered the evaluation model. NFA registered, 90/10 profit split, EOD trailing drawdown, $149 activation fee on Standard Path.", instantFund:false, sizes:["50K","100K","150K"], payoutType:"Weekly", minDaysPass:"2 days", drawdownType:"EOD Trailing", hasDLL:true, hasConsistency:true, consistencyPct:"50%", newsTrading:true, eaAllowed:false, bestFor:"Most Established" },
  { id:9, name:"Take Profit Trader", initials:"TPT", logoUrl:"https://www.google.com/s2/favicons?domain=takeprofittrader.com&sz=128", founded:2022, rating:4.4, reviews:8801, pulse:74, trend:"down", maxAlloc:"$750K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","+10"], challenge:"1-Step Eval", steps:1, split:"80/20 → 90/10", target:"$5,000", dailyDD:"$1,100", maxDD:"$2,500", minPayout:"$200", paySpeed:"1–3 days", reset:"$99", hq:"Orlando, FL", color:"#eab308", brandGrad:"linear-gradient(135deg,#eab308,#ca8a04)", desc:"Known for fast payouts and transparent rules. Active community with frequent promotional events and competitive pricing.", instantFund:false, sizes:["25K","50K","75K","100K","150K"], payoutType:"Daily (PRO+)", minDaysPass:"No minimum", drawdownType:"EOD Trailing", hasDLL:true, hasConsistency:true, consistencyPct:"40%", newsTrading:true, eaAllowed:true, bestFor:"Daily Payouts" },
  { id:10, name:"Bulenox", initials:"BX", logoUrl:"https://www.google.com/s2/favicons?domain=bulenox.com&sz=128", founded:2022, rating:4.6, reviews:1400, pulse:81, trend:"up", maxAlloc:"$450K", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","Bookmap","+1"], challenge:"1-Step Eval", steps:1, split:"90/10", target:"$4,500", dailyDD:"$1,500", maxDD:"$2,500", minPayout:"$500", paySpeed:"1–5 days", reset:"$75", hq:"Wilmington, DE", color:"#ec4899", brandGrad:"linear-gradient(135deg,#ec4899,#db2777)", desc:"Competitive pricing with the lowest reset fees in the industry. Generous drawdown rules and scaling plans up to $450K.", instantFund:false, sizes:["25K","50K","100K","150K","250K"], payoutType:"Weekly", minDaysPass:"No minimum", drawdownType:"EOD / Trailing (Choose)", hasDLL:true, hasConsistency:true, consistencyPct:"40%", newsTrading:true, eaAllowed:true, bestFor:"Best Value" },
];

const DEALS = [
  { firm:"Tradeify", pct:"40% OFF", code:"PULSE", color:"#0ea5e9", desc:"40% off all accounts (first 5 uses) then 30% off subsequent", tag:"3.0 LAUNCH", expires:"" },
  { firm:"Apex Trader Funding", pct:"90% OFF", code:"PULSE", color:"#f97316", desc:"90% off all one-time evaluation fees (4.0 accounts)", tag:"HOT", expires:"" },
  { firm:"My Funded Futures", pct:"50% OFF", code:"PULSE", color:"#a855f7", desc:"50% off all Pro accounts for new users", tag:"", expires:"" },
  { firm:"Top One Futures", pct:"60% OFF", code:"PULSE", color:"#06b6d4", desc:"60% off all evaluation and instant funding accounts", tag:"", expires:"" },
  { firm:"Lucid Trading", pct:"50% OFF", code:"PULSE", color:"#14b8a6", desc:"50% off on Flex & Pro accounts (First 2 orders)", tag:"NEW OFFER", expires:"Apr 4" },
  { firm:"Take Profit Trader", pct:"40% OFF", code:"PULSE", color:"#eab308", desc:"40% off all evaluation account sizes", tag:"", expires:"" },
  { firm:"Alpha Futures", pct:"15% OFF", code:"PULSE", color:"#8b5cf6", desc:"15% off all evaluations", tag:"", expires:"" },
  { firm:"FundedNext Futures", pct:"30% OFF", code:"PULSE", color:"#06b6d4", desc:"30% off all futures challenge accounts", tag:"", expires:"" },
  { firm:"Bulenox", pct:"75% OFF", code:"PULSE", color:"#3b82f6", desc:"75% off all evaluation accounts", tag:"HOT", expires:"" },
  { firm:"Topstep", pct:"50% OFF", code:"PULSE", color:"#64748b", desc:"50% off Trading Combine — first month only", tag:"", expires:"" },
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

  { id:4, title:"March 2026 Prop Firm Rule Changes: Everything You Need to Know", date:"Mar 10, 2026", cat:"News", time:"4 min", color:"#06b6d4",
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

// ─── VIDEOS ─────────────────────────────────────────────────────────────────
// Add videos here: just drop in the YouTube video ID and metadata.
// To get the ID: from a URL like https://youtube.com/watch?v=dQw4w9WgXcQ the ID is "dQw4w9WgXcQ"
const VIDEOS = [
  {id:"dRhMfFMzSfA",title:"How I Passed a $150K Apex Account in Under 1 Hour (All Trades Shown)",firm:"Apex Trader Funding",cat:"Strategy",date:"Mar 2026",duration:"18:32"},
  {id:"SXR7C0kJrIc",title:"ICT Concepts Explained — Smart Money Trading for Beginners",firm:null,cat:"Education",date:"2025",duration:"42:15"},
  {id:"L7G0OfJUgN8",title:"Day Trading Futures for Beginners — Complete Step by Step Guide",firm:null,cat:"Guide",date:"2025",duration:"28:47"},
  {id:"5mQ5hGeBA6U",title:"How to ACTUALLY Pass a Prop Firm Evaluation (Futures Edition)",firm:null,cat:"Strategy",date:"2025",duration:"22:10"},
  {id:"jk-GVX9aFhg",title:"EOD vs Intraday Trailing Drawdown — Which Should You Choose?",firm:null,cat:"Education",date:"2026",duration:"15:33"},
  {id:"bfbEKfKt4F0",title:"NQ Scalping Strategy That Actually Works — Live Trading",firm:null,cat:"Strategy",date:"2025",duration:"34:20"},
  {id:"Yy9siocXRCo",title:"Risk Management for Funded Accounts — Stop Blowing Drawdown",firm:null,cat:"Education",date:"2025",duration:"19:45"},
  {id:"MfC_oGImigA",title:"Topstep vs Apex vs Tradeify — Best Prop Firm 2026 Comparison",firm:null,cat:"Comparison",date:"2026",duration:"25:18"},
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
  {firm:"My Funded Futures",plan:"Core",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"None",drawdown:"EOD Trailing",minDays:"2 days",consistency:"50% (eval) / 40% (funded)",split:"80/20",payout:"5 Winning Days",standard:true,instant:false,news:false,ea:true,price:"$77/mo or $229 one-time"},
  
  
  {firm:"My Funded Futures",plan:"Rapid",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"None",drawdown:"Intraday Trailing",minDays:"2 days",consistency:"None",split:"90/10",payout:"Daily",standard:false,instant:false,news:false,ea:true,price:"$129/mo or $157 one-time"},
  {firm:"My Funded Futures",plan:"Rapid",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"None",drawdown:"Intraday Trailing",minDays:"2 days",consistency:"None",split:"90/10",payout:"Daily",standard:false,instant:false,news:false,ea:true,price:"$199/mo or $267 one-time"},
  {firm:"My Funded Futures",plan:"Rapid",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"None",drawdown:"Intraday Trailing",minDays:"2 days",consistency:"None",split:"90/10",payout:"Daily",standard:false,instant:false,news:false,ea:true,price:"$249/mo or $347 one-time"},
  {firm:"My Funded Futures",plan:"Pro",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"None",drawdown:"EOD Trailing",minDays:"2 days",consistency:"None (funded)",split:"80/20",payout:"Bi-Weekly",standard:false,instant:false,news:false,ea:true,price:"$229/mo or $629 one-time"},
  {firm:"My Funded Futures",plan:"Pro",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"None",drawdown:"EOD Trailing",minDays:"2 days",consistency:"None (funded)",split:"80/20",payout:"Bi-Weekly",standard:false,instant:false,news:false,ea:true,price:"$299/mo or $829 one-time"},
  {firm:"My Funded Futures",plan:"Pro",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"None",drawdown:"EOD Trailing",minDays:"2 days",consistency:"None (funded)",split:"80/20",payout:"Bi-Weekly",standard:false,instant:false,news:false,ea:true,price:"$399/mo or $1,127 one-time"},
  // ALPHA FUTURES
  {firm:"Alpha Futures",plan:"Standard",size:"50K",target:"$3,000",maxLoss:"$2,500",dll:"Soft Guard",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Eval)",split:"70→80→90%",payout:"Bi-Weekly",standard:true,instant:false,news:true,ea:false,price:"$79/mo"},
  {firm:"Alpha Futures",plan:"Standard",size:"100K",target:"$6,000",maxLoss:"$3,500",dll:"Soft Guard",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Eval)",split:"70→80→90%",payout:"Bi-Weekly",standard:true,instant:false,news:true,ea:false,price:"$149/mo"},
  {firm:"Alpha Futures",plan:"Standard",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"Soft Guard",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Eval)",split:"70→80→90%",payout:"Bi-Weekly",standard:true,instant:false,news:true,ea:false,price:"$219/mo"},
  // APEX TRADER FUNDING (4.0 — March 2026)
  {firm:"Apex Trader Funding",plan:"EOD",size:"25K",target:"$1,500",maxLoss:"$1,000",dll:"$750 (soft)",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$147 one-time + $99 activation"},
  {firm:"Apex Trader Funding",plan:"EOD",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"$1,000 (soft)",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$197 one-time + $99 activation"},
  {firm:"Apex Trader Funding",plan:"EOD",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"$1,500 (soft)",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$297 one-time + $99 activation"},
  {firm:"Apex Trader Funding",plan:"EOD",size:"150K",target:"$9,000",maxLoss:"$4,000",dll:"$2,000 (soft)",drawdown:"EOD Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:true,instant:false,news:true,ea:true,price:"$397 one-time + $99 activation"},
  {firm:"Apex Trader Funding",plan:"Intraday",size:"25K",target:"$1,500",maxLoss:"$1,000",dll:"None",drawdown:"Intraday Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:false,instant:false,news:true,ea:true,price:"$118 one-time + $79 activation"},
  {firm:"Apex Trader Funding",plan:"Intraday",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"None",drawdown:"Intraday Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:false,instant:false,news:true,ea:true,price:"$131 one-time + $79 activation"},
  {firm:"Apex Trader Funding",plan:"Intraday",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"None",drawdown:"Intraday Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:false,instant:false,news:true,ea:true,price:"$198 one-time + $79 activation"},
  {firm:"Apex Trader Funding",plan:"Intraday",size:"150K",target:"$9,000",maxLoss:"$4,000",dll:"None",drawdown:"Intraday Trailing",minDays:"1 day",consistency:"50% (Funded)",split:"100% first $25K",payout:"After 5 Days",standard:false,instant:false,news:true,ea:true,price:"$265 one-time + $79 activation"},
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
  {firm:"Topstep",plan:"Combine",size:"50K",target:"$3,000",maxLoss:"$2,000",dll:"Tier-based",drawdown:"EOD Trailing",minDays:"2 days",consistency:"50%",split:"90/10",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$49/mo + $149 activation"},
  {firm:"Topstep",plan:"Combine",size:"100K",target:"$6,000",maxLoss:"$3,000",dll:"Tier-based",drawdown:"EOD Trailing",minDays:"2 days",consistency:"50%",split:"90/10",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$99/mo + $149 activation"},
  {firm:"Topstep",plan:"Combine",size:"150K",target:"$9,000",maxLoss:"$4,500",dll:"Tier-based",drawdown:"EOD Trailing",minDays:"2 days",consistency:"50%",split:"90/10",payout:"Weekly",standard:true,instant:false,news:true,ea:true,price:"$149/mo + $149 activation"},
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

// Funded-phase overrides — only fields that DIFFER from eval. Keyed by "firm|plan".
const FUNDED_OVERRIDES = {
  "Tradeify|Select":{consistency:"None (Flex) / 50% (Daily)",dll:"None (Flex) / $500–$1,750 (Daily)",drawdown:"EOD Trailing (locks at balance + $100)",minDays:"N/A",target:"N/A"},
  "Tradeify|Growth":{consistency:"35%",dll:"$600–$3,750",drawdown:"EOD Trailing (locks at balance + $100)",minDays:"N/A",target:"N/A"},
  "Tradeify|Lightning":{consistency:"20→25→30% (progressive)",minDays:"N/A",target:"N/A"},
  "My Funded Futures|Core":{consistency:"40%",drawdown:"EOD (locks at balance)",minDays:"5 winning days",target:"N/A"},
  "My Funded Futures|Rapid":{consistency:"None",drawdown:"Intraday Trailing",minDays:"5 winning days",target:"N/A"},
  "My Funded Futures|Pro":{consistency:"None",drawdown:"EOD (locks at balance)",minDays:"14 calendar days",target:"N/A"},
  "Alpha Futures|Standard":{consistency:"None",split:"70→80→90%",minDays:"N/A",target:"N/A"},
  "Apex Trader Funding|EOD":{consistency:"50%",dll:"$750–$2,000 (soft, pauses trading)",drawdown:"EOD Trailing (locks at balance + $100)",minDays:"5 qualifying days",target:"N/A",split:"100% first $25K → 90/10"},
  "Apex Trader Funding|Intraday":{consistency:"50%",dll:"Tier-based",drawdown:"Intraday Trailing (locks at balance + $100)",minDays:"5 qualifying days",target:"N/A",split:"100% first $25K → 90/10"},
  "Top One Futures|Eval":{consistency:"30%",minDays:"5 days",target:"N/A"},
  "Top One Futures|Prime":{consistency:"30%",target:"N/A"},
  "FundedNext Futures|Rapid":{consistency:"None",minDays:"N/A",target:"N/A",split:"80/20→95/5"},
  "Lucid Trading|Flex Eval":{consistency:"None",drawdown:"EOD Trailing",minDays:"5 profitable days",target:"N/A",split:"90/10"},
  "Lucid Trading|Direct":{consistency:"20%",target:"N/A"},
  "Topstep|Combine":{consistency:"50%",drawdown:"EOD Trailing (locks once reached)",minDays:"5 winning days (Standard) / 15 (Consistency)",target:"N/A",split:"90/10"},
  "Take Profit Trader|Eval":{consistency:"40%",minDays:"N/A",target:"N/A",split:"80/20→90/10 (PRO+)"},
  "Bulenox|Eval":{consistency:"40%",minDays:"N/A",target:"N/A",split:"100% first $10K → 90/10"},
};

const LOGO_URL = "data:image/png;base64,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";


const css = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
:root{
  --bg:#0A0F1C;--bg1:#0D1326;--bg2:#111830;--bg3:#16203E;--bg4:#1C2850;
  --surface:rgba(15,23,42,0.75);--surface2:rgba(15,23,42,0.88);
  --glass:rgba(15,23,42,0.75);--glass2:rgba(10,15,28,0.92);
  --bdr:rgba(0,240,255,0.12);--bdr2:rgba(0,240,255,0.2);--bdr3:rgba(0,240,255,0.4);
  --cyan:#00F0FF;--emerald:#00D4A5;--orange:#FF9500;
  --cyan10:rgba(0,240,255,0.1);--cyan20:rgba(0,240,255,0.2);--cyan40:rgba(0,240,255,0.4);
  --em10:rgba(0,212,165,0.1);--em20:rgba(0,212,165,0.2);
  --or10:rgba(255,149,0,0.1);--or20:rgba(255,149,0,0.2);
  --green:#00D4A5;--red:#ff4757;--amber:#FFB800;--gold:#FF9500;
  --t1:#FFFFFF;--t2:#A3BFFA;--t3:#7B9ADB;--t4:#5A7AB5;--t5:#3D5A8A;
  --heading:'Sora',system-ui,-apple-system,BlinkMacSystemFont,sans-serif;
  --body:'Inter',system-ui,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,monospace;
  --glow-soft:0 0 20px 4px;
  --glow-med:0 0 40px 8px;
  --glow-strong:0 0 60px 12px;
  --glow-pulse:0 0 80px 20px;
  --glow-cyan:0 0 20px 4px rgba(0,240,255,0.3),0 0 40px 8px rgba(0,240,255,0.15);
  --glow-emerald:0 0 20px 4px rgba(0,212,165,0.3),0 0 40px 8px rgba(0,212,165,0.15);
  --glow-orange:0 0 20px 4px rgba(255,149,0,0.3),0 0 40px 8px rgba(255,149,0,0.15);
  --radius:20px;--radius-sm:12px;--radius-xs:8px;
  --transition:180ms cubic-bezier(0.4,0,0.2,1);
  /* Backward compat aliases for PulsePointsTab */
  --gold:#FF9500;--em:#00F0FF;--em2:#66F5FF;--em3:#99F8FF;
  --emA:rgba(0,240,255,0.1);--emA2:rgba(0,240,255,0.18);
  --sans:'Sora',system-ui,sans-serif;--serif:'Sora',system-ui,sans-serif;
  --glow:0 0 4px var(--cyan),0 0 12px rgba(0,240,255,0.5),0 0 28px rgba(0,240,255,0.2);
  --glow-sm:0 0 4px rgba(0,240,255,0.6),0 0 10px rgba(0,240,255,0.3);
  --glow-box:0 0 1px rgba(0,240,255,0.3),0 0 8px rgba(0,240,255,0.15),0 0 24px rgba(0,240,255,0.08);
  --glow-gold:0 0 4px #FF9500,0 0 12px rgba(255,149,0,0.4),0 0 28px rgba(255,149,0,0.15);
  --glow-gold-sm:0 0 4px rgba(255,149,0,0.5),0 0 10px rgba(255,149,0,0.25);
  --glow-green:0 0 4px rgba(0,212,165,0.5),0 0 10px rgba(0,212,165,0.25);
  --glow-red:0 0 4px rgba(255,71,87,0.4),0 0 10px rgba(255,71,87,0.2);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body,#root{background:var(--bg);color:var(--t1);font-family:var(--body);font-size:16px;line-height:1.6;min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(0,240,255,0.25);border-radius:3px}

/* ── ANIMATED BG ── */
.bg-grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(0,240,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.03) 1px,transparent 1px);background-size:60px 60px;opacity:0.6}
.bg-radial{position:fixed;inset:0;z-index:0;pointer-events:none}
.bg-radial::before{content:'';position:absolute;width:2000px;height:1200px;top:-300px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(0,240,255,0.28) 0%,rgba(0,212,165,0.15) 25%,rgba(255,149,0,0.08) 45%,transparent 65%);border-radius:50%;animation:bgBreathe 8s ease-in-out infinite}
@keyframes bgBreathe{0%,100%{transform:translateX(-50%) scale(1);opacity:1}50%{transform:translateX(-50%) scale(1.05);opacity:.7}}
.bg-radial::after{content:'';position:absolute;width:1200px;height:1200px;bottom:-500px;right:-200px;background:radial-gradient(circle,rgba(255,149,0,0.1) 0%,rgba(0,212,165,0.05) 35%,transparent 60%);border-radius:50%}

/* ── PARTICLES ── */
.particle{position:fixed;width:3px;height:3px;border-radius:50%;pointer-events:none;z-index:0;animation:particleDrift linear infinite}
@keyframes particleDrift{0%{transform:translateY(0) translateX(0);opacity:0}10%{opacity:0.7}90%{opacity:0.7}100%{transform:translateY(-100vh) translateX(30px);opacity:0}}

/* ── TOP GLOW LINE ── */
.top-line{position:fixed;top:0;left:0;right:0;height:2px;z-index:200;pointer-events:none;background:linear-gradient(90deg,transparent,var(--cyan),var(--emerald),var(--cyan),transparent);box-shadow:0 0 30px rgba(0,240,255,0.6),0 0 80px rgba(0,240,255,0.2)}

/* ── PAGE ── */
.page{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column}

/* ── TOP NAV ── */
.topnav{position:sticky;top:0;z-index:100;height:68px;display:flex;align-items:center;padding:0 28px;background:var(--glass2);backdrop-filter:blur(24px) saturate(1.3);border-bottom:1px solid var(--bdr2)}
.topnav::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,240,255,0.3),rgba(0,212,165,0.3),rgba(0,240,255,0.3),transparent)}
.nav-left{display:flex;align-items:center;gap:10px;cursor:pointer}
.nav-logo-p{width:42px;height:42px;border-radius:10px;background:linear-gradient(135deg,var(--cyan),var(--emerald));display:flex;align-items:center;justify-content:center;font-family:var(--heading);font-size:22px;font-weight:900;color:var(--bg);box-shadow:var(--glow-cyan)}
.nav-brand{font-family:var(--heading);font-size:20px;font-weight:700;color:var(--t1)}
.nav-brand span{color:var(--cyan);text-shadow:0 0 12px rgba(0,240,255,0.4)}
.nav-ticker{flex:1;overflow:hidden;margin:0 20px;height:28px;position:relative}
.nav-ticker-track{display:flex;align-items:center;gap:36px;height:100%;white-space:nowrap;animation:tickScroll 90s linear infinite;padding:0 16px}
@keyframes tickScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.tick-item{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:500;color:var(--t3);flex-shrink:0}
.tick-item b{color:var(--orange);font-family:var(--mono);font-weight:700;text-shadow:0 0 8px rgba(255,149,0,0.4)}
.tick-name{color:var(--cyan);font-weight:700}
.tick-sep{color:var(--t5);font-size:6px}
.nav-right{display:flex;align-items:center;gap:12px}
.nav-pts{display:flex;align-items:center;gap:6px;font-family:var(--mono);font-size:14px;font-weight:700;color:var(--orange);text-shadow:0 0 12px rgba(255,149,0,0.4);padding:6px 14px;border-radius:var(--radius-xs);background:var(--or10);border:1px solid rgba(255,149,0,0.2)}
.nav-avatar{width:36px;height:36px;border-radius:50%;border:2px solid var(--cyan40);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;background:var(--cyan10);color:var(--cyan);cursor:pointer}
.nav-cta{font-family:var(--heading);font-size:13px;font-weight:700;color:var(--bg);background:linear-gradient(135deg,var(--cyan),var(--emerald));border:none;padding:10px 22px;border-radius:var(--radius-xs);cursor:pointer;box-shadow:var(--glow-cyan);transition:var(--transition);text-transform:uppercase;letter-spacing:.5px}
.nav-cta:hover{transform:scale(1.04);box-shadow:var(--glow-strong) rgba(0,240,255,0.3)}
.nav-burger{display:none;background:none;border:none;color:var(--cyan);font-size:24px;cursor:pointer}
.mob-overlay{position:fixed;inset:0;background:var(--bg);z-index:99;padding:80px 20px 20px;display:flex;flex-direction:column;gap:4px;overflow-y:auto}
.mob-overlay button{background:none;border:none;color:var(--t2);font-family:var(--heading);font-size:16px;font-weight:600;padding:16px 20px;text-align:left;border-radius:var(--radius-sm);cursor:pointer;border-bottom:1px solid var(--bdr)}
.mob-overlay button:hover,.mob-overlay button.on{color:var(--cyan);background:var(--cyan10);text-shadow:0 0 8px rgba(0,240,255,0.3)}

/* ── DASHBOARD LAYOUT ── */
.dashboard{display:flex;flex:1;min-height:calc(100vh - 68px)}
.sidebar-l{width:240px;flex-shrink:0;background:var(--glass2);backdrop-filter:blur(24px);border-right:1px solid var(--bdr);padding:20px 0;display:flex;flex-direction:column;gap:2px;position:sticky;top:68px;height:calc(100vh - 68px);overflow-y:auto}
.sb-item{display:flex;align-items:center;gap:10px;padding:12px 24px;font-size:14px;font-weight:600;color:var(--t3);cursor:pointer;transition:var(--transition);border-left:3px solid transparent}
.sb-item:hover{color:var(--cyan);background:var(--cyan10)}
.sb-item.on{color:var(--cyan);background:var(--cyan10);border-left-color:var(--cyan);text-shadow:0 0 8px rgba(0,240,255,0.3)}
.sb-item .sb-icon{width:20px;text-align:center;font-size:16px}
.sb-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--t5);padding:20px 24px 8px}
.main-content{flex:1;min-width:0;padding:28px 32px;overflow-y:auto}
.sidebar-r{width:300px;flex-shrink:0;background:var(--glass2);backdrop-filter:blur(24px);border-left:1px solid var(--bdr);padding:20px 16px;position:sticky;top:68px;height:calc(100vh - 68px);overflow-y:auto;display:flex;flex-direction:column;gap:20px}

/* ── REWARDS SIDEBAR ── */
.rw-pts{text-align:center;padding:24px 16px;background:var(--surface);border:1px solid rgba(255,149,0,0.2);border-radius:var(--radius);position:relative;overflow:hidden}
.rw-pts::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at center,rgba(255,149,0,0.08) 0%,transparent 70%);pointer-events:none}
.rw-pts-num{font-family:var(--mono);font-size:48px;font-weight:900;color:var(--orange);text-shadow:0 0 20px rgba(255,149,0,0.5),0 0 60px rgba(255,149,0,0.2);line-height:1}
.rw-pts-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:var(--t3);margin-top:8px}
.rw-tier{padding:16px;background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius)}
.rw-tier-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t3);margin-bottom:12px}
.rw-tier-bar{height:8px;background:var(--bg3);border-radius:4px;overflow:hidden}
.rw-tier-fill{height:100%;background:linear-gradient(90deg,var(--emerald),var(--cyan));border-radius:4px;transition:width .6s ease}
.rw-tier-labels{display:flex;justify-content:space-between;font-size:10px;color:var(--t4);margin-top:6px}
.rw-feed{display:flex;flex-direction:column;gap:8px}
.rw-feed-item{padding:10px 12px;background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius-sm);font-size:12px;color:var(--t3)}
.rw-feed-item b{color:var(--cyan);font-weight:700}
.rw-feed-item .orange{color:var(--orange)}

/* ── HERO ── */
.hero{text-align:center;max-width:900px;margin:0 auto;padding:48px 0 40px;position:relative}
.hero-eyebrow{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:3px;color:var(--cyan);text-shadow:0 0 12px rgba(0,240,255,0.4);margin-bottom:16px}
.hero-title{font-family:var(--heading);font-size:clamp(42px,5vw,72px);font-weight:900;letter-spacing:-2px;line-height:1.1;margin-bottom:20px}
.hero-title .cyan{color:var(--cyan);text-shadow:0 0 20px rgba(0,240,255,0.4)}
.hero-title .emerald{color:var(--emerald);text-shadow:0 0 20px rgba(0,212,165,0.4)}
.hero-title .orange{color:var(--orange);text-shadow:0 0 20px rgba(255,149,0,0.4)}
.hero-sub{font-size:18px;color:var(--t2);max-width:680px;margin:0 auto 28px;line-height:1.6;font-weight:400}
.hero-sub b{color:var(--orange);font-weight:700}
.hero-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-bottom:32px}
.btn-primary{font-family:var(--heading);font-size:16px;font-weight:700;color:var(--bg);background:linear-gradient(135deg,var(--cyan),var(--emerald),var(--orange));border:none;padding:14px 32px;border-radius:var(--radius-sm);cursor:pointer;box-shadow:var(--glow-cyan);transition:var(--transition);text-transform:uppercase;letter-spacing:.5px}
.btn-primary:hover{transform:scale(1.04);box-shadow:var(--glow-strong) rgba(0,240,255,0.35)}
.btn-secondary{font-family:var(--heading);font-size:15px;font-weight:600;color:var(--cyan);background:transparent;border:1px solid var(--cyan40);padding:13px 28px;border-radius:var(--radius-sm);cursor:pointer;transition:var(--transition);box-shadow:var(--glow-soft) rgba(0,240,255,0.1)}
.btn-secondary:hover{background:var(--cyan10);box-shadow:var(--glow-med) rgba(0,240,255,0.2);transform:scale(1.04)}
.hero-stats{display:flex;justify-content:center;gap:48px;padding-top:24px;border-top:1px solid var(--bdr)}
.hero-stat{text-align:center}
.hero-stat b{font-family:var(--mono);font-size:32px;font-weight:900;display:block;line-height:1}
.hero-stat small{font-size:11px;color:var(--t4);font-weight:600;margin-top:4px;display:block;text-transform:uppercase;letter-spacing:.5px}
.hero-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(0,240,255,0.2),rgba(0,212,165,0.3),rgba(0,240,255,0.2),transparent);margin:0 0 24px}

/* ── SECTION HEADERS ── */
.sec-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px}
.sec-title{font-family:var(--heading);font-size:24px;font-weight:700;color:var(--t1)}
.sec-sub{font-size:14px;color:var(--t3);margin-top:2px}

/* ── FILTER CHIPS ── */
.filters{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.f-chip{font-family:var(--body);font-size:13px;font-weight:600;padding:8px 18px;border-radius:999px;border:1px solid var(--bdr2);background:var(--surface);backdrop-filter:blur(12px);color:var(--t3);cursor:pointer;transition:var(--transition)}
.f-chip:hover{border-color:var(--cyan40);color:var(--cyan);box-shadow:var(--glow-soft) rgba(0,240,255,0.1)}
.f-chip.on{color:var(--cyan);background:var(--cyan10);border-color:var(--cyan40);box-shadow:var(--glow-soft) rgba(0,240,255,0.15)}

/* ── FIRM CARDS (Terminal Style) ── */
.cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px}
.fcard{background:var(--surface);backdrop-filter:blur(24px);border:1px solid var(--bdr2);border-radius:var(--radius);padding:24px;transition:var(--transition);position:relative;overflow:hidden;cursor:default}
.fcard::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--card-accent,var(--cyan)),transparent);opacity:0.6}
.fcard:hover{transform:scale(1.02);border-color:var(--bdr3);box-shadow:var(--glow-soft) var(--card-glow,rgba(0,240,255,0.15))}
.fcard-header{display:flex;align-items:center;gap:14px;margin-bottom:16px;cursor:pointer}
.fcard-logo{width:48px;height:48px;border-radius:12px;overflow:hidden;border:1px solid var(--bdr2);flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--bg2)}
.fcard-logo img{width:100%;height:100%;object-fit:cover}
.fcard-info{flex:1;min-width:0}
.fcard-name{font-family:var(--heading);font-size:17px;font-weight:700;color:var(--t1);display:flex;align-items:center;gap:6px}
.fcard-name .tp{color:var(--orange);font-size:14px;text-shadow:0 0 8px rgba(255,149,0,0.4)}
.fcard-sub{font-size:12px;color:var(--t4);font-weight:500}
.fcard-deal{font-family:var(--mono);font-size:14px;font-weight:800;color:var(--bg);background:var(--orange);padding:4px 12px;border-radius:6px;box-shadow:var(--glow-soft) rgba(255,149,0,0.3);white-space:nowrap;flex-shrink:0}
.fcard-rating{display:flex;align-items:center;gap:8px;margin-bottom:12px;cursor:pointer}
.fcard-rating .stars{color:#facc15;font-size:12px;text-shadow:0 0 6px rgba(250,204,21,0.3)}
.fcard-rating .rv{font-size:11px;color:var(--t4)}
.best-for{font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;margin-left:auto;white-space:nowrap}
.fcard-desc{font-size:13px;color:var(--t3);line-height:1.5;margin-bottom:14px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;cursor:pointer}
.fcard-specs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;padding:12px;background:var(--bg2);border-radius:var(--radius-sm);border:1px solid var(--bdr)}
.fcard-spec{text-align:center}
.fcard-spec-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--t4);margin-bottom:2px}
.fcard-spec-val{font-family:var(--mono);font-size:14px;font-weight:700;color:var(--t1)}
.fcard-pulse{display:flex;align-items:center;gap:8px}
.fcard-pulse-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--t4)}
.fcard-pulse-score{font-family:var(--mono);font-size:20px;font-weight:900}
.fcard-pulse-bar{flex:1;height:4px;background:var(--bg3);border-radius:2px;overflow:hidden}
.fcard-pulse-fill{height:100%;border-radius:2px;transition:width .6s ease;animation:pulseFill 3s ease-in-out infinite}
@keyframes pulseFill{0%,100%{opacity:1}50%{opacity:.7}}
.fcard-actions{display:flex;gap:8px;margin-top:14px}
.fcard-btn-buy{flex:1;font-family:var(--heading);font-size:13px;font-weight:700;color:var(--bg);background:linear-gradient(135deg,var(--orange),#FF6B00);border:none;padding:11px 16px;border-radius:var(--radius-xs);cursor:pointer;transition:var(--transition);box-shadow:var(--glow-soft) rgba(255,149,0,0.2);text-align:center}
.fcard-btn-buy:hover{transform:scale(1.03);box-shadow:var(--glow-med) rgba(255,149,0,0.3)}
.fcard-btn-detail{font-family:var(--body);font-size:13px;font-weight:600;color:var(--cyan);background:var(--cyan10);border:1px solid var(--cyan20);padding:10px 16px;border-radius:var(--radius-xs);cursor:pointer;transition:var(--transition)}
.fcard-btn-detail:hover{background:var(--cyan20);box-shadow:var(--glow-soft) rgba(0,240,255,0.15)}
.cmp-tog{font-size:11px;font-weight:600;color:var(--t4);background:none;border:1px solid var(--bdr2);padding:5px 12px;border-radius:6px;cursor:pointer;transition:var(--transition)}
.cmp-tog:hover{border-color:var(--cyan40);color:var(--cyan)}

/* ── TABLE VIEW ── */
.tbl-wrap{overflow-x:auto;margin-bottom:20px;border-radius:var(--radius);border:1px solid var(--bdr)}
.tbl{width:100%;border-collapse:collapse;font-size:13px}
.tbl thead{background:var(--bg2)}
.tbl th{padding:12px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--t4);border-bottom:1px solid var(--bdr2)}
.tbl td{padding:10px 14px;border-bottom:1px solid var(--bdr);color:var(--t2)}
.tbl tr:hover{background:var(--cyan10)}
.tbl .mono{font-family:var(--mono)}

/* ── OFFERS ── */
.offers-list{display:flex;flex-direction:column;gap:10px}
.offer-row{display:flex;align-items:center;gap:16px;padding:18px 20px;background:var(--surface);backdrop-filter:blur(16px);border:1px solid var(--bdr);border-radius:var(--radius);transition:var(--transition)}
.offer-row:hover{border-color:var(--bdr3);box-shadow:var(--glow-soft) rgba(0,240,255,0.1)}
.offer-pct{font-family:var(--mono);font-size:20px;font-weight:900;color:var(--orange);text-shadow:0 0 12px rgba(255,149,0,0.3);white-space:nowrap;min-width:100px}
.offer-info{flex:1;min-width:0}
.offer-firm{font-family:var(--heading);font-size:15px;font-weight:700;color:var(--t1);display:flex;align-items:center;gap:8px}
.offer-tag{font-size:9px;font-weight:800;padding:2px 8px;border-radius:4px;background:var(--orange);color:var(--bg);text-transform:uppercase;letter-spacing:.5px}
.offer-desc{font-size:12px;color:var(--t3);margin-top:2px}
.offer-code{font-family:var(--mono);font-size:14px;font-weight:700;padding:8px 18px;border-radius:var(--radius-xs);background:var(--cyan10);border:1px dashed var(--cyan40);color:var(--cyan);cursor:pointer;transition:var(--transition);white-space:nowrap}
.offer-code:hover{background:var(--cyan20);box-shadow:var(--glow-soft) rgba(0,240,255,0.2)}

/* ── GIVEAWAY ── */
.gw-prize{text-align:center;padding:40px 20px;background:var(--surface);border:1px solid rgba(255,149,0,0.2);border-radius:var(--radius);margin-bottom:24px;position:relative;overflow:hidden}
.gw-prize::before{content:'';position:absolute;inset:0;background:radial-gradient(circle,rgba(255,149,0,0.06) 0%,transparent 70%);pointer-events:none}
.gw-val{font-family:var(--mono);font-size:56px;font-weight:900;color:var(--orange);text-shadow:0 0 30px rgba(255,149,0,0.5),0 0 80px rgba(255,149,0,0.2);margin:12px 0}
.gw-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.gw-step{background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius-sm);padding:16px;text-align:center}
.gw-step-n{font-family:var(--mono);font-size:20px;font-weight:900;color:var(--cyan);text-shadow:0 0 8px rgba(0,240,255,0.3)}
.gw-step-t{font-size:13px;font-weight:700;color:var(--t1);margin-top:6px}
.gw-step-d{font-size:11px;color:var(--t4);margin-top:2px}
.gw-btn{font-family:var(--heading);font-size:15px;font-weight:700;color:var(--bg);background:linear-gradient(135deg,var(--orange),#FF6B00);border:none;padding:14px 36px;border-radius:var(--radius-sm);cursor:pointer;box-shadow:var(--glow-orange);transition:var(--transition)}
.gw-btn:hover{transform:scale(1.04);box-shadow:var(--glow-strong) rgba(255,149,0,0.3)}
.gw-rules{background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius-sm);padding:20px}
.gw-rules h4{font-family:var(--heading);font-size:14px;font-weight:700;color:var(--t2);margin-bottom:10px}
.gw-rules li{font-size:12px;color:var(--t3);margin-bottom:4px;list-style:none;padding-left:16px;position:relative}
.gw-rules li::before{content:'›';position:absolute;left:0;color:var(--cyan)}

/* ── BLOG ── */
.blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}
.blog-card{background:var(--surface);backdrop-filter:blur(16px);border:1px solid var(--bdr);border-radius:var(--radius);padding:24px;cursor:pointer;transition:var(--transition)}
.blog-card:hover{transform:scale(1.02);border-color:var(--bdr3);box-shadow:var(--glow-soft) var(--card-glow,rgba(0,240,255,0.15))}
.blog-cat{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.blog-title{font-family:var(--heading);font-size:17px;font-weight:700;color:var(--t1);line-height:1.35;margin-bottom:8px}
.blog-excerpt{font-size:13px;color:var(--t3);line-height:1.5;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.blog-date{font-size:11px;color:var(--t4)}
.blog-body{line-height:1.8;color:var(--t2)}
.blog-h2{font-family:var(--heading);font-size:20px;font-weight:700;color:var(--cyan);margin:28px 0 12px;text-shadow:0 0 12px rgba(0,240,255,0.2)}
.blog-p{font-size:15px;margin-bottom:16px;color:var(--t2)}

/* ── DETAIL PAGE ── */
.det-back{background:none;border:none;color:var(--cyan);font-family:var(--body);font-size:14px;font-weight:600;cursor:pointer;padding:8px 0;transition:var(--transition);display:flex;align-items:center;gap:6px}
.det-back:hover{text-shadow:0 0 8px rgba(0,240,255,0.3)}
.det-hero{display:flex;align-items:center;gap:24px;margin:20px 0 32px;padding:32px;background:var(--surface);backdrop-filter:blur(24px);border:1px solid var(--bdr2);border-radius:var(--radius)}
.det-logo{width:72px;height:72px;border-radius:16px;overflow:hidden;border:2px solid var(--bdr3);display:flex;align-items:center;justify-content:center;background:var(--bg2)}
.det-logo img{width:100%;height:100%;object-fit:cover}
.det-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;margin-bottom:24px}
.det-card{background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius-sm);padding:18px}
.det-card-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--t4);margin-bottom:4px}
.det-card-val{font-family:var(--mono);font-size:16px;font-weight:700;color:var(--t1)}
.det-section{margin-bottom:24px}
.det-section h3{font-family:var(--heading);font-size:18px;font-weight:700;color:var(--t1);margin-bottom:12px}

/* ── CHALLENGES TAB ── */
.ch-hero{margin-bottom:28px}
.ch-hero .sec-title{font-size:32px;letter-spacing:-0.5px;background:linear-gradient(135deg,var(--cyan),var(--emerald));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.ch-hero .sec-sub{font-size:15px;margin-top:6px}
.ch-count{font-size:13px;color:var(--t3);margin-bottom:14px}
.ch-count b{color:var(--cyan);font-family:var(--mono);font-weight:700}
.ch-filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px;align-items:center}
.ch-filter-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4);margin-right:2px}
.ch-toggle{font-family:var(--body);font-size:13px;font-weight:600;padding:10px 18px;border-radius:999px;cursor:pointer;transition:var(--transition);border:1px solid var(--bdr2);background:var(--surface);backdrop-filter:blur(12px);color:var(--t3)}
.ch-toggle:hover{border-color:var(--cyan40);color:var(--cyan);transform:translateY(-1px)}
.ch-toggle.on{background:var(--cyan10);border-color:var(--cyan);color:var(--cyan);box-shadow:0 0 16px rgba(0,240,255,0.15)}
.ch-divider{width:1px;height:28px;background:var(--bdr2);margin:0 6px}
.ch-clear{font-size:12px;font-weight:600;color:var(--t4);background:none;border:none;cursor:pointer;padding:8px 12px;margin-left:auto;border-radius:var(--radius-xs)}
.ch-clear:hover{color:var(--red)}
.phase-tabs{display:inline-flex;gap:4px;margin-bottom:20px;padding:4px;background:var(--bg2);border:1px solid var(--bdr);border-radius:999px}
.phase-tab{font-family:var(--heading);font-size:14px;font-weight:700;padding:10px 24px;border-radius:999px;cursor:pointer;transition:var(--transition);border:none;background:transparent;color:var(--t3)}
.phase-tab:hover{color:var(--cyan)}
.phase-tab.on{background:linear-gradient(135deg,var(--cyan),var(--emerald));color:var(--bg);box-shadow:0 0 16px rgba(0,240,255,0.3)}
.ch-list{display:flex;flex-direction:column;gap:12px}
.ch-empty{text-align:center;padding:60px 24px;color:var(--t4);background:var(--surface);border:1px dashed var(--bdr2);border-radius:var(--radius);font-size:15px}
.ch-card{display:grid;grid-template-columns:minmax(220px,1.3fr) repeat(4,minmax(90px,1fr)) auto;gap:20px;align-items:center;padding:20px 24px;background:var(--surface);backdrop-filter:blur(12px);border:1px solid var(--bdr);border-radius:var(--radius);cursor:pointer;transition:var(--transition);position:relative;overflow:hidden}
.ch-card::before{content:'';position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--card-accent,var(--cyan)),transparent);opacity:0;transition:var(--transition)}
.ch-card:hover{border-color:var(--bdr3);transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,240,255,0.08),0 0 0 1px rgba(0,240,255,0.1)}
.ch-card:hover::before{opacity:1}
.ch-firm{display:flex;align-items:center;gap:14px;min-width:0}
.ch-firm-logo{flex-shrink:0;width:44px;height:44px;border-radius:12px;overflow:hidden;border:1px solid var(--bdr2);background:var(--bg2);display:flex;align-items:center;justify-content:center}
.ch-firm-info{min-width:0;flex:1}
.ch-firm-name{font-family:var(--heading);font-size:16px;font-weight:700;color:var(--t1);line-height:1.2;margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ch-firm-plan{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:var(--cyan);background:var(--cyan10);padding:3px 10px;border-radius:999px;text-transform:uppercase;letter-spacing:.5px}
.ch-firm-size{font-size:11px;color:var(--t4);margin-left:6px;font-family:var(--mono);font-weight:700}
.ch-stat{display:flex;flex-direction:column;gap:4px;min-width:0}
.ch-stat-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t4)}
.ch-stat-val{font-family:var(--mono);font-size:15px;font-weight:700;color:var(--t1);line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ch-stat-val.good{color:var(--emerald);text-shadow:0 0 10px rgba(0,212,165,0.3)}
.ch-stat-val.warn{color:var(--amber)}
.ch-stat-val.price{font-size:14px;color:var(--cyan)}
.ch-stat-sub{font-size:10px;color:var(--t4);font-family:var(--mono)}
.ch-cta{display:flex;align-items:center;gap:4px;font-family:var(--heading);font-size:12px;font-weight:700;color:var(--cyan);padding:10px 18px;border-radius:999px;border:1px solid var(--cyan40);background:var(--cyan10);transition:var(--transition);white-space:nowrap;text-transform:uppercase;letter-spacing:.5px}
.ch-card:hover .ch-cta{background:linear-gradient(135deg,var(--cyan),var(--emerald));color:var(--bg);border-color:transparent;box-shadow:0 0 20px rgba(0,240,255,0.4)}
@media(max-width:1100px){
  .ch-card{grid-template-columns:minmax(200px,1.5fr) repeat(2,1fr) auto;grid-template-areas:"firm s1 s2 cta" "firm s3 s4 cta";row-gap:14px}
  .ch-firm{grid-area:firm}
  .ch-cta{grid-area:cta}
}
@media(max-width:720px){
  .ch-card{grid-template-columns:1fr 1fr;grid-template-areas:"firm cta" "s1 s2" "s3 s4";padding:18px}
  .ch-hero .sec-title{font-size:26px}
}

/* ── NEWSLETTER ── */
.newsletter{text-align:center;padding:40px 24px;background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius);margin:32px 0}
.nl-title{font-family:var(--heading);font-size:22px;font-weight:700;margin-bottom:6px}
.nl-sub{font-size:14px;color:var(--t3);margin-bottom:16px}
.nl-form{display:flex;gap:8px;max-width:440px;margin:0 auto}
.nl-input{flex:1;padding:12px 16px;border-radius:var(--radius-xs);border:1px solid var(--bdr2);background:var(--bg2);color:var(--t1);font-family:var(--body);font-size:14px;outline:none}
.nl-input:focus{border-color:var(--cyan);box-shadow:var(--glow-soft) rgba(0,240,255,0.1)}

/* ── AUTH MODAL ── */
.auth-overlay{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;background:rgba(10,15,28,0.85);backdrop-filter:blur(8px)}
.auth-modal{background:var(--bg1);border:1px solid var(--bdr2);border-radius:var(--radius);padding:32px;width:380px;max-width:90vw;position:relative}
.auth-close{position:absolute;top:12px;right:12px;background:none;border:none;color:var(--t4);font-size:18px;cursor:pointer}
.auth-title{font-family:var(--heading);font-size:22px;font-weight:700;margin-bottom:20px;text-align:center}
.auth-input{width:100%;padding:12px 16px;border-radius:var(--radius-xs);border:1px solid var(--bdr2);background:var(--bg2);color:var(--t1);font-family:var(--body);font-size:14px;margin-bottom:10px;outline:none}
.auth-input:focus{border-color:var(--cyan)}
.auth-btn{width:100%;padding:13px;font-family:var(--heading);font-size:15px;font-weight:700;border:none;border-radius:var(--radius-xs);cursor:pointer;transition:var(--transition)}
.auth-toggle{font-size:13px;color:var(--t3);text-align:center;margin-top:14px}
.auth-toggle span{color:var(--cyan);cursor:pointer;font-weight:600}
.auth-err{font-size:12px;color:var(--red);text-align:center;margin-bottom:8px}

/* ── COMPARE ── */
.cmp-tray{position:fixed;bottom:0;left:0;right:0;z-index:90;background:var(--glass2);backdrop-filter:blur(24px);border-top:1px solid var(--bdr2);padding:14px 28px;display:flex;align-items:center;gap:14px;box-shadow:0 -4px 40px rgba(0,240,255,0.1)}
.cmp-tray-chip{display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:var(--radius-xs);border:1px solid;background:var(--surface);font-size:13px}
.cmp-tray-chip button{background:none;border:none;color:var(--t4);cursor:pointer;font-size:14px}
.cmp-tray-go{font-family:var(--heading);font-size:13px;font-weight:700;color:var(--bg);background:linear-gradient(135deg,var(--cyan),var(--emerald));border:none;padding:10px 22px;border-radius:var(--radius-xs);cursor:pointer;margin-left:auto}
.cmp-tray-clear{font-size:12px;color:var(--t4);background:none;border:none;cursor:pointer}
.cmp-overlay{position:fixed;inset:0;z-index:150;background:rgba(10,15,28,0.9);backdrop-filter:blur(6px);overflow-y:auto;padding:40px 20px}
.cmp-inner{max-width:1100px;margin:0 auto;background:var(--bg1);border:1px solid var(--bdr2);border-radius:var(--radius);overflow:hidden}
.cmp-head{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--bdr)}
.cmp-head h2{font-family:var(--heading);font-size:20px;font-weight:700}
.cmp-close{background:none;border:none;color:var(--t4);font-size:22px;cursor:pointer}
.cmp-grid{overflow-x:auto}
.cmp-row{border-bottom:1px solid var(--bdr)}
.cmp-label{padding:10px 16px;font-size:12px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;background:var(--bg2)}
.cmp-cell{padding:10px 16px;font-size:13px;color:var(--t2);text-align:center}

/* ── FOOTER ── */
.footer{background:var(--glass2);border-top:1px solid var(--bdr);padding:40px 28px 20px;margin-top:auto}
.ft-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}
.ft-brand{font-family:var(--heading);font-size:20px;font-weight:700;margin-bottom:8px}
.ft-brand span{color:var(--cyan)}
.ft-desc{font-size:13px;color:var(--t4);line-height:1.5;max-width:280px}
.ft-col h4{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--t4);margin-bottom:10px}
.ft-col a{display:block;font-size:13px;color:var(--t3);text-decoration:none;padding:3px 0;transition:color .15s}
.ft-col a:hover{color:var(--cyan)}
.ft-bottom{text-align:center;padding-top:20px;margin-top:20px;border-top:1px solid var(--bdr);font-size:11px;color:var(--t5)}

/* ── PULSE POINTS ── */
.pp-hero{text-align:center;padding:32px;background:var(--surface);border:1px solid rgba(255,149,0,0.15);border-radius:var(--radius);margin-bottom:24px;position:relative;overflow:hidden}
.pp-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle,rgba(255,149,0,0.06) 0%,transparent 60%);pointer-events:none}

/* ── ACCOUNT PAGE ── */
.acct-card{background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius);padding:24px;margin-bottom:16px}

/* ── TOAST ── */
.toast{position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--cyan);color:var(--bg);font-family:var(--heading);font-size:13px;font-weight:700;padding:10px 24px;border-radius:var(--radius-xs);box-shadow:var(--glow-cyan);z-index:300;animation:toastIn .3s ease}
@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* ── BOTTOM FEED ── */
.bottom-feed{height:60px;overflow:hidden;background:var(--glass2);border-top:1px solid var(--bdr);display:flex;align-items:center}
.bf-track{display:flex;align-items:center;gap:28px;white-space:nowrap;animation:bfScroll 45s linear infinite;padding:0 20px}
@keyframes bfScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.bf-item{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--t3);flex-shrink:0;padding:6px 14px;background:var(--surface);border:1px solid var(--bdr);border-radius:999px}
.bf-item b{color:var(--cyan);font-weight:700}
.bf-item .orange{color:var(--orange);font-weight:700}

/* ── FILTER BUTTONS (legacy compat) ── */
.f-btn{font-family:var(--body);font-size:12px;font-weight:600;padding:7px 14px;border-radius:999px;border:1px solid var(--bdr2);background:var(--surface);color:var(--t3);cursor:pointer;transition:var(--transition)}
.f-btn:hover{border-color:var(--cyan40);color:var(--cyan)}
.f-btn.on{color:var(--cyan);background:var(--cyan10);border-color:var(--cyan40)}

/* ── PULSE POINTS TAB ── */
.pp{max-width:800px;margin:0 auto}
.pp-tabs{display:flex;gap:4px;margin-bottom:20px;flex-wrap:wrap}
.pp-card{background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius);padding:20px;margin-bottom:14px;position:relative;overflow:hidden}
.pp-hdr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;margin-bottom:16px}
.pp-login-prompt{text-align:center;padding:40px;background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius)}
.pp-row{display:flex;gap:12px;margin-bottom:10px;flex-wrap:wrap;align-items:center}
.pp-submit{font-family:var(--heading);font-size:13px;font-weight:700;color:var(--bg);background:linear-gradient(135deg,var(--orange),#FF6B00);border:none;padding:11px 22px;border-radius:var(--radius-xs);cursor:pointer;box-shadow:var(--glow-orange);transition:var(--transition)}
.pp-form{display:flex;flex-direction:column;gap:10px}
.task-card{background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius-sm);padding:16px;margin-bottom:10px;position:relative;overflow:hidden}

/* ── COMPARE OVERLAY (legacy compat) ── */
.cmp-modal{max-width:1100px;margin:20px auto;background:var(--bg1);border:1px solid var(--bdr2);border-radius:var(--radius);overflow:hidden;max-height:90vh;overflow-y:auto}
.cmp-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--bdr)}
.cmp-header h2{font-family:var(--heading);font-size:20px;font-weight:700}
.cmp-firm-hdr{text-align:center;padding:16px 10px}
.cmp-firm-name{font-family:var(--heading);font-size:14px;font-weight:700;margin-top:8px}
.cmp-firm-pulse{font-family:var(--mono);font-size:18px;font-weight:800;margin-top:4px}
.cmp-deal-btn{font-family:var(--heading);font-size:11px;font-weight:700;color:var(--bg);background:linear-gradient(135deg,var(--orange),#FF6B00);border:none;padding:8px 14px;border-radius:6px;cursor:pointer;margin-top:8px}
.lb-deal{font-family:var(--mono);font-size:11px;font-weight:700;color:var(--bg);background:var(--orange);padding:3px 8px;border-radius:4px;cursor:pointer}

/* ── RESPONSIVE ── */
@media(max-width:1200px){.sidebar-r{display:none}.sidebar-l{width:200px}}
@media(max-width:900px){
  .sidebar-l{display:none}
  .dashboard{flex-direction:column}
  .main-content{padding:20px 16px}
  .nav-burger{display:block}
  .nav-ticker{display:none}
  .topnav{padding:0 16px}
  .cards-grid{grid-template-columns:1fr}
  .hero-stats{gap:20px;flex-wrap:wrap}
  .hero-title{font-size:36px}
  .gw-steps{grid-template-columns:1fr 1fr}
  .ft-inner{grid-template-columns:1fr 1fr}
  .det-hero{flex-direction:column;text-align:center}
  .det-grid{grid-template-columns:1fr}
  .nl-form{flex-direction:column}
  .offer-row{flex-wrap:wrap}
  .cmp-tray{flex-wrap:wrap;gap:8px;padding:12px 16px}
}
@media(max-width:600px){
  .ft-inner{grid-template-columns:1fr}
  .gw-steps{grid-template-columns:1fr}
  .hero-stats{flex-direction:column;gap:16px}
}

/* ── BACKWARD COMPAT ALIASES ── */
:root{
  --em:var(--cyan);--em2:var(--cyan);--em3:var(--cyan);--emA:var(--cyan10);--emA2:var(--cyan20);
  --gold:var(--orange);--sans:var(--body);--serif:var(--heading);
  --glass2:var(--surface2);
  --glow-sm:0 0 8px rgba(0,240,255,0.4),0 0 16px rgba(0,240,255,0.2);
  --glow-gold-sm:0 0 8px rgba(255,149,0,0.4),0 0 16px rgba(255,149,0,0.2);
  --glow-green:0 0 8px rgba(0,212,165,0.4),0 0 16px rgba(0,212,165,0.2);
  --glow-red:0 0 8px rgba(255,71,87,0.3),0 0 16px rgba(255,71,87,0.15);
}

/* ── PULSE POINTS TAB ── */
.pp{max-width:900px;margin:0 auto}
.pp-hdr-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:24px}
.pp-card{background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius);padding:20px;text-align:center}
.pp-tabs{display:flex;gap:4px;margin-bottom:20px;flex-wrap:wrap}
.pp-tabs button{font-size:13px;font-weight:600;padding:8px 18px;border-radius:999px;cursor:pointer;transition:var(--transition);border:1px solid var(--bdr2);background:var(--surface);color:var(--t3)}
.pp-tabs button:hover{border-color:var(--cyan40);color:var(--cyan)}
.pp-tabs button.on{background:var(--cyan10);border-color:var(--cyan);color:var(--cyan)}
.pp-form{display:flex;flex-direction:column;gap:10px;margin-bottom:20px}
.pp-form select,.pp-form input,.pp-form textarea{padding:12px 16px;border-radius:var(--radius-xs);border:1px solid var(--bdr2);background:var(--bg2);color:var(--t1);font-family:var(--body);font-size:14px;outline:none}
.pp-form select:focus,.pp-form input:focus,.pp-form textarea:focus{border-color:var(--cyan)}
.pp-submit{font-family:var(--heading);font-size:14px;font-weight:700;color:var(--bg);background:linear-gradient(135deg,var(--cyan),var(--emerald));border:none;padding:12px 24px;border-radius:var(--radius-xs);cursor:pointer;transition:var(--transition)}
.pp-submit:hover{transform:scale(1.03);box-shadow:var(--glow-cyan)}
.pp-submit:disabled{opacity:0.5;cursor:not-allowed;transform:none}
.pp-row{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius-sm);margin-bottom:8px;font-size:13px}
.pp-login-prompt{text-align:center;padding:48px 24px;background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius)}
.pp-tab{font-size:13px;font-weight:600;padding:8px 18px;border-radius:999px;cursor:pointer;transition:var(--transition);border:1px solid var(--bdr2);background:var(--surface);color:var(--t3)}
.pp-tab:hover{border-color:var(--cyan40);color:var(--cyan)}
.pp-tab.on{background:var(--cyan10);border-color:var(--cyan);color:var(--cyan)}
.pp-status{font-size:10px;font-weight:700;padding:3px 10px;border-radius:999px;text-transform:uppercase;letter-spacing:.5px}
.pp-status.pending{background:rgba(255,184,0,0.15);color:var(--amber)}
.pp-status.approved{background:rgba(0,212,165,0.15);color:var(--emerald)}
.pp-status.rejected{background:rgba(255,71,87,0.15);color:var(--red)}
.task-card{background:var(--surface);border:1px solid var(--bdr);border-radius:var(--radius-sm);padding:16px;transition:var(--transition)}
.task-card:hover{border-color:var(--bdr3);box-shadow:var(--glow-soft) rgba(0,240,255,0.1)}

/* ── COMPARE OVERLAY (extended) ── */
.cmp-modal{max-width:1100px;margin:0 auto;background:var(--bg1);border:1px solid var(--bdr2);border-radius:var(--radius);overflow:hidden}
.cmp-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--bdr)}
.cmp-header h2{font-family:var(--heading);font-size:20px;font-weight:700}
.cmp-firm-hdr{text-align:center;padding:16px}
.cmp-firm-name{font-family:var(--heading);font-size:14px;font-weight:700;margin-top:8px}
.cmp-firm-pulse{font-family:var(--mono);font-size:18px;font-weight:800;margin-top:4px}
.cmp-deal-btn{font-size:11px;font-weight:700;color:var(--bg);background:var(--orange);border:none;padding:6px 14px;border-radius:6px;cursor:pointer;margin-top:8px}

/* ── MISC ── */
.f-btn{font-family:var(--body);font-size:13px;font-weight:600;padding:8px 18px;border-radius:999px;border:1px solid var(--bdr2);background:var(--surface);backdrop-filter:blur(12px);color:var(--t3);cursor:pointer;transition:var(--transition)}
.f-btn:hover{border-color:var(--cyan40);color:var(--cyan);box-shadow:var(--glow-soft) rgba(0,240,255,0.1)}
.f-btn.on{color:var(--cyan);background:var(--cyan10);border-color:var(--cyan40);box-shadow:var(--glow-soft) rgba(0,240,255,0.15)}
.lb-deal{font-family:var(--mono);font-size:11px;font-weight:700;color:var(--orange);cursor:pointer;padding:2px 8px;border-radius:4px;background:var(--or10);border:1px solid rgba(255,149,0,0.2)}
.review-card{transition:var(--transition)}
.review-card:hover{transform:scale(1.02);box-shadow:var(--glow-soft) rgba(0,240,255,0.1)}
`;
const PULSE_SCORES = {"Tradeify":95,"Lucid Trading":94,"My Funded Futures":94,"Alpha Futures":93,"Top One Futures":93,"Take Profit Trader":90,"FundedNext Futures":90,"Apex Trader Funding":92,"Bulenox":87,"Topstep":83};
const TOP_PICKS = new Set(["Tradeify","Apex Trader Funding","Top One Futures"]);
const calcPulse = (r,rv,name) => PULSE_SCORES[name] || 75;

const AFFILIATE_LINKS = {
  "Apex Trader Funding":"https://apextraderfunding.com/member/aff/go/jwachter0823",
  "Tradeify":"https://tradeify.co/?ref=CUCNCROP",
  "Top One Futures":"https://toponefutures.com/?linkId=lp_707970&sourceId=timelesstrading&tenantId=toponefutures",
  "Bulenox":"https://bulenox.com/member/aff/go/jwachter0823",
  "Alpha Futures":"https://app.alpha-futures.com/signup/Joey021384/",
  "My Funded Futures":"https://myfundedfutures.com/challenge?ref=1788"
};

const trackClick = async (firmName) => {
  const {data:{session}} = await supabase.auth.getSession();
  if(session?.user) {
    await supabase.from("click_tracking").insert({user_id:session.user.id, firm:firmName});
  }
  const url = AFFILIATE_LINKS[firmName];
  if(url) window.open(url,"_blank");
};
const pulseColor = s => s>=92?"var(--gold)":s>=88?"#fbbf24":s>=84?"#f59e0b":"var(--t4)";
const copyToClipboard = text => {
  if(navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
  const ta=document.createElement("textarea");ta.value=text;ta.style.cssText="position:fixed;left:-9999px";document.body.appendChild(ta);ta.select();try{document.execCommand("copy")}catch(e){}document.body.removeChild(ta);return Promise.resolve();
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
    description:"My Funded Futures (MFFU) launched in late 2023 by Matthew Leech and rapidly became the highest-rated futures prop firm on Trustpilot (4.9/5 from 11,000+ reviews). Completely restructured plans in July 2025: Core, Rapid, and Pro replaced old Starter/Expert. Zero activation fees. Core ($50K only, 80/20), Rapid (90/10, daily payouts, intraday trailing), Pro (80/20, no consistency funded, bi-weekly). One-time payment options available on all plans.",
    website:"myfundedfutures.com",
    ceo:"Matthew Leech",
    totalPayouts:"$25M+ reported",
    discordMembers:"Active Discord + live chat",
    plans:["Core ($50K only)","Rapid ($50K–$150K)","Pro ($50K–$150K)"],
    accountSizes:"$50K (Core) | $50K, $100K, $150K (Rapid & Pro)",
    profitSplit:"80/20 (Core & Pro) | 90/10 (Rapid). Payout caps vary by plan.",
    drawdown:"EOD Trailing (Core & Pro) — locks at starting balance. Intraday Trailing (Rapid) — follows peak equity including unrealized P&L.",
    payoutSpeed:"Most approved instantly — 6-12 hours if manual review. $15 flat fee per withdrawal via RiseWorks.",
    payoutFreq:"Every 5 winning days (Core & Rapid) | Bi-weekly / 14 calendar days (Pro)",
    activationFee:"$0 — No activation fees on any plan",
    platforms:["NinjaTrader","Tradovate","Rithmic","TradingView","+6"],
    instruments:"CME, CBOT, COMEX, NYMEX Futures",
    newsTrading:"Restricted on Rapid & Pro — must be flat during Tier 1 events (FOMC, NFP, CPI). Core allows news trading.",
    eaPolicy:"Yes — automated trading generally permitted",
    overnightHolds:"No — must close positions by session end on all plans",
    consistencyRule:"50% during eval (all plans) | 40% on Core funded | None on Rapid & Pro funded",
    dailyLossLimit:"None — no DLL on any plan. Only trailing drawdown (EOD or intraday).",
    scalingPlan:"Core: micro-contract scaling on funded. Rapid: micro-contract scaling on funded. Pro: full contracts from day one, no scaling.",
    livePath:"Live account after meeting progression criteria ($100K cumulative payouts on Pro, or 5+ payouts on other plans)",
    maxAccounts:"Multiple accounts allowed",
    pros:["No daily loss limit on any plan","4.9/5 Trustpilot — highest rated futures prop firm","No activation fees","Pro plan: zero consistency rule funded","Rapid plan: 90/10 split with daily payouts","One-time payment options available","Instant payout approvals"],
    cons:["Core only available in $50K size","Monthly subscription model (one-time option costs more)","Rapid uses intraday trailing drawdown (aggressive)","Core/Pro split is 80/20","News restricted on Rapid & Pro","$15 withdrawal fee per payout","Payout caps on Core ($5K) and Rapid ($11.25K)"]
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
    description:"Apex Trader Funding launched in 2021 by Darrell Martin in Austin, TX. One of the largest futures prop firms with $720M+ in total payouts. Completely rebuilt with Apex 4.0 on March 1, 2026: one-time payment model, two drawdown types (EOD Trail & Intraday Trail), automated Deel payouts, 6-payout cap per PA. Removed MAE, 5:1 RR, monthly fees, 250K/300K sizes, and manual payout reviews. Metals suspended, overnight positions banned.",
    website:"apextraderfunding.com",
    ceo:"Darrell Martin",
    totalPayouts:"$720M+",
    discordMembers:"59,000+ Discord",
    plans:["EOD Trailing Drawdown","Intraday Trailing Drawdown"],
    accountSizes:"$25K, $50K, $100K, $150K (75K/250K/300K removed in 4.0)",
    profitSplit:"100% of first $25K, then 90/10. Payout ladder with caps per cycle (6 payouts max per PA).",
    drawdown:"EOD Trail: recalculates at 4:59 PM ET, includes DLL. Intraday Trail: real-time trailing including unrealized P&L, no DLL. Both lock at balance + $100. MLL: $1K(25K), $2K(50K), $3K(100K), $4K(150K).",
    payoutSpeed:"Automated via Deel — 3-4 business days after approval",
    payoutFreq:"After 5 qualifying trading days ($250+ net profit per day on 100K). Max 6 payouts per PA lifetime.",
    activationFee:"$99 (EOD) or $79 (Intraday) — paid after passing eval, not upfront",
    platforms:["Rithmic","Tradovate","WealthCharts"],
    instruments:"CME, CBOT, NYMEX, COMEX Futures — METALS SUSPENDED (GC, SI, MGC, HG, PL, PA as of March 2026)",
    newsTrading:"Yes — permitted for normal strategies. 'Windfall' exploitation prohibited.",
    eaPolicy:"Yes — automated trading permitted. DCA prohibited on Performance Accounts. Mandatory bracket orders enforced by platform.",
    overnightHolds:"No — all positions must close by 4:59 PM ET. Overnight banned on all 4.0 accounts.",
    consistencyRule:"50% on Performance Accounts only (not during eval). No single day > 50% of total profit since last payout.",
    dailyLossLimit:"EOD accounts only: $750(25K), $1K(50K), $1.5K(100K), $2K(150K). Pauses trading for the day — does NOT fail account. Intraday accounts have NO DLL.",
    scalingPlan:"Up to 20 Performance Accounts simultaneously. Half contracts on PA until trailing threshold cleared. Tier-based scaling as balance grows.",
    livePath:"After 6 payouts, PA closes. Purchase new evaluation to restart. No live capital path currently.",
    maxAccounts:"Up to 20 PAs simultaneously (all types combined)",
    pros:["100% of first $25K profits","One-time fees — no more subscriptions","EOD drawdown option (huge improvement)","Up to 20 simultaneous accounts","Simplified rules — MAE/5:1 RR removed","$720M+ total payouts","Automated payout processing via Deel","No consistency rule during eval — pass in 1 day"],
    cons:["Activation fee on top of eval fee ($79-$99)","6-payout cap then PA closes (rebuy required)","Metals completely suspended (Gold/Silver/etc.)","30-day eval expiry — no resets","Intraday trailing drawdown is aggressive","Overnight positions banned","DCA prohibited on funded accounts","Payout caps per cycle limit withdrawals","Contract limits reduced on PA vs eval"]
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
    description:"Topstep is the OG futures prop firm, founded in 2012 in Chicago by CME floor trader Michael Patak. NFA registered with their own brokerage (TopStep Brokerage LLC). 13+ years of operation. February 2026 update introduced Standard Path ($149 activation fee) and No Activation Fee Path. Profit split now 90/10 from day one for new traders. Over 155,000 Discord members.",
    website:"topstep.com",
    ceo:"Michael Patak",
    totalPayouts:"$20M+ reported",
    discordMembers:"155,000+ Discord members",
    plans:["Trading Combine (Standard Path)","Trading Combine (No Activation Fee Path)"],
    accountSizes:"$50K, $100K, $150K",
    profitSplit:"90/10 from day one (new traders as of Feb 2026). 100% first $10K may still apply to legacy accounts.",
    drawdown:"EOD Trailing — recalculates at session close only. Locks at starting balance once threshold reached.",
    payoutSpeed:"1-3 business days for approval, 1-3 more for delivery. $30 withdrawal fee per payout.",
    payoutFreq:"Weekly payouts, up to 4x/month. Daily payouts available after milestones.",
    activationFee:"$149 (Standard Path) or $0 (No Activation Fee Path — higher monthly sub)",
    platforms:["TopstepX (proprietary)","NinjaTrader","Quantower","Tradovate","R Trader Pro"],
    instruments:"CME Group Futures — ES, NQ, CL, GC, and others",
    newsTrading:"Yes — allowed with no restrictions",
    eaPolicy:"No — automated trading/bots generally not permitted",
    overnightHolds:"No — must close all positions by 3:10 PM CT",
    consistencyRule:"50% — best single day cannot exceed 50% of total profits",
    dailyLossLimit:"Tier-based DLL that varies by account size and scaling tier",
    scalingPlan:"Tier-based scaling increases contract limits as balance grows",
    livePath:"Express Funded (sim) → Live Funded Account with real CME capital",
    maxAccounts:"Up to 5 funded accounts",
    pros:["13+ years of operation — most established firm","NFA registered brokerage","Cheapest entry ($49/mo for 50K)","EOD drawdown — most forgiving in industry","155,000+ Discord community","Educational resources and TopstepTV","Path to real live capital"],
    cons:["90/10 split (no longer 100% first $10K for new traders)","$149 activation fee on Standard Path","$30 per withdrawal fee","Forced close by 3:10 PM CT","TopstepX platform limitations","50% consistency rule","Only 5 funded accounts max"]
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

// ── FIRM FAQ DATA ──
const FIRM_FAQ = {
  "Tradeify":[
    {cat:"Trading Hours",items:[
      {q:"When can I trade?",a:"6:00 PM ET (Sun–Thu) to 4:59 PM ET (Mon–Fri). All positions must be closed by 4:59 PM ET. Holiday early close: 12:59 PM ET."},
      {q:"Can I hold overnight?",a:"No. All positions must be closed within the same trading session. Positions left open are auto-closed (no account failure, but poor fills possible)."},
      {q:"Can I trade weekends?",a:"No. Markets close Friday 5:00 PM ET and reopen Sunday 6:00 PM ET."}
    ]},
    {cat:"Instruments & Contracts",items:[
      {q:"What can I trade?",a:"Full CME Group access: ES, NQ, RTY, YM (+ micros), GC, SI, CL, NG, HG, currency futures (6E, 6B, 6J), crypto (BTC, ETH), agriculture, treasuries, VIX. EUREX with optional data add-on."},
      {q:"Can I mix minis and micros?",a:"No. You can trade either minis OR micros, but not both simultaneously. This applies across ALL your accounts. You can switch between sessions (close all micros, then trade minis next session)."},
      {q:"Contract limits?",a:"Eval: 25K=1/10, 50K=4/40, 100K=8/80, 150K=12/120 (standard/micro). Funded accounts use progressive scaling starting lower."}
    ]},
    {cat:"Drawdown Rules",items:[
      {q:"How does EOD trailing drawdown work?",a:"Your max loss floor only updates once per day at 5:00 PM ET based on your highest end-of-day balance. Intraday dips that recover don't count. However, if your balance touches the floor at ANY point during the session, the account fails immediately."},
      {q:"Does the drawdown lock?",a:"Yes. On Select Flex funded accounts, the floor locks (stops trailing) at starting balance + a cap ($1,250 for 50K). After that it becomes static — your safety net stops moving."},
      {q:"What are the max loss limits?",a:"25K: $1,000 | 50K: $2,000 | 100K: $3,500 | 150K: $4,500 (Select). Lightning 150K reduced to $5,250 in 3.0 update."}
    ]},
    {cat:"Consistency Rule",items:[
      {q:"What is the consistency rule?",a:"No single trading day can account for more than X% of your total profits. Select eval: 40%. Growth funded: 35%. Lightning: 20% → 25% → 30% (progressive). Select Flex funded: 50% cap per day."},
      {q:"Does it apply during evaluation?",a:"Yes on Select (40%). Growth eval also has consistency. Lightning is already funded, so consistency applies from day one."}
    ]},
    {cat:"Daily Loss Limit",items:[
      {q:"Is there a DLL?",a:"Select eval: No DLL. Select Flex funded: No DLL. Select Daily funded: $500(25K)/$1K(50K)/$1.25K(100K)/$1.75K(150K). Growth: $600(25K)/$1.25K(50K)/$2.5K(100K)/$3.75K(150K). Lightning: $1.25K(50K)/$2.5K(100K)/$3K(150K) — removed at 6% profit."},
      {q:"What happens if I hit the DLL?",a:"Trading pauses for the rest of the day (soft breach). Your account is NOT failed. You come back next session with a fresh DLL."}
    ]},
    {cat:"Payouts",items:[
      {q:"How fast are payouts?",a:"Same-day to 48 hours via Rise or Plane. Most processed within 24 hours."},
      {q:"How often can I withdraw?",a:"Select Daily: every trading day. Select Flex: every 5 profitable days ($100+ each). Growth/Lightning: per profit goal milestone."},
      {q:"Are there payout caps?",a:"Select Daily: $500(25K)/$1K(50K)/$1.5K(100K)/$2.5K(150K) per day. Select Flex: 2× profit earned since last payout, capped at $1K–$2.5K."},
      {q:"Is there an activation fee?",a:"$0. No activation fees on any Tradeify account."}
    ]},
    {cat:"Prohibited Activities",items:[
      {q:"What will get me failed?",a:"Hedging same instrument (even across accounts), mixing mini/micro simultaneously, platform manipulation, latency arbitrage, spoofing, copy trading from external sources, breaching drawdown."},
      {q:"Can I copy trade between my own accounts?",a:"Restricted. Each account needs independent trading behavior — meaningful variation in entry timing, sizing, or instrument. Exact mirrors get flagged."},
      {q:"Can I use EAs/bots?",a:"Yes, if you're the sole owner. Not HFT. Must be able to prove ownership. 50%+ of trades must be held longer than 10 seconds AND 50%+ of profit from trades held longer than 10 seconds."}
    ]},
    {cat:"Accounts & Scaling",items:[
      {q:"How many accounts can I have?",a:"Up to 5 funded accounts per trader, combined max balance $750K. Can mix Select, Growth, and Lightning."},
      {q:"What is Tradeify Elite?",a:"After 5 total payouts across all accounts, you're eligible for Elite — trade real CME capital with up to 5 live accounts. Includes Performance Reward Pool up to $90K."},
      {q:"Can I reset a failed account?",a:"Growth and Select: yes, at reduced price. Lightning: no resets — must purchase new account."}
    ]},
    {cat:"Platforms",items:[
      {q:"What platforms are supported?",a:"Tradovate (web/desktop/mobile), NinjaTrader 8, Rithmic (NEW 3.0), TradeSea (NEW 3.0), TradingView (via Tradovate), Quantower, WealthCharts. All execution routes through platform backend."},
      {q:"Is there a platform fee?",a:"No platform surcharges. All brokers are the same price. Market data is free with Non-Professional Agreement."}
    ]}
  ],
  "My Funded Futures":[
    {cat:"Trading Hours",items:[
      {q:"When can I trade?",a:"CME Globex hours: Sunday 5:00 PM CT to Friday 4:00 PM CT. All positions must be closed by session end."},
      {q:"Can I hold overnight?",a:"No. Must close all positions before session end on all plans."}
    ]},
    {cat:"Instruments",items:[
      {q:"What can I trade?",a:"CME, CBOT, NYMEX, COMEX regulated futures — ES, NQ, RTY, YM, GC, SI, CL, NG, ZB, ZN, and agricultural futures. No crypto, forex, equities, or OTC."},
      {q:"Are there contract limits?",a:"Yes, varies by account size and plan. Core uses micro-contract scaling on funded. Pro has full contracts from day one. Check MFFU help center for specifics per instrument."}
    ]},
    {cat:"Drawdown Rules",items:[
      {q:"How does drawdown work?",a:"Core & Pro: EOD trailing — floor only updates at session close, locks at starting balance once reached. Rapid: Intraday trailing — follows peak equity in real time INCLUDING unrealized P&L."},
      {q:"Max loss amounts?",a:"50K: $2,000 | 100K: $3,000 | 150K: $4,500. Same across all plans during eval."},
      {q:"Why is Rapid's drawdown dangerous?",a:"If you're up $1,500 on an open trade that reverses, the floor already moved up $1,500. Close at breakeven and you've lost $1,500 of buffer. This is the #1 way Rapid traders get eliminated."}
    ]},
    {cat:"Consistency Rule",items:[
      {q:"What is the consistency rule?",a:"Eval (all plans): 50% — no single day > 50% of total profit. There's $100 leniency. Core funded: 40%. Rapid funded: None. Pro funded: None."},
      {q:"How does it work in practice?",a:"On a 50K eval ($3,000 target), to pass in 2 days you'd make ~$1,500 each day. If one day is $2,000, you'd need at least $4,000+ total for that day to be under 50%."}
    ]},
    {cat:"Payouts",items:[
      {q:"How fast are payouts?",a:"Most approved instantly. Manual review takes 6-12 hours. Processed via RiseWorks. $15 flat fee per withdrawal."},
      {q:"How often can I withdraw?",a:"Core: every 5 winning days. Rapid: every 5 winning days. Pro: every 14 calendar days (bi-weekly)."},
      {q:"Are there payout caps?",a:"Core: $5,000 per cycle. Rapid: $11,250 per cycle. Pro: no per-cycle cap, but $100K total cumulative cap across all Pro accounts."},
      {q:"Is there an activation fee?",a:"$0. No activation fees on any MFFU plan."}
    ]},
    {cat:"News Trading",items:[
      {q:"Can I trade the news?",a:"Core: Yes, allowed. Rapid & Pro: Restricted — must be flat during Tier 1 events (FOMC, NFP, CPI). Holding through a Tier 1 event is a hard violation."}
    ]},
    {cat:"Plans Comparison",items:[
      {q:"Core vs Rapid vs Pro?",a:"Core ($77/mo, 50K only): 80/20 split, EOD drawdown, 40% consistency funded, $5K payout cap. Cheapest entry. Rapid ($129+/mo): 90/10 split, intraday trailing drawdown, no consistency funded, $11.25K cap. Pro ($229+/mo): 80/20 split, EOD drawdown, no consistency funded, no per-cycle cap, bi-weekly payouts."},
      {q:"Can I switch plans?",a:"No. You pass or fail the evaluation you purchased. Purchase a new evaluation on a different plan to run in parallel."}
    ]},
    {cat:"Prohibited Activities",items:[
      {q:"What's not allowed?",a:"Exploiting simulator latency, hedging across MFFU accounts, holding through Tier 1 news (Rapid/Pro), trading unsupported instruments, exceeding contract limits. HFT prohibited."},
      {q:"$10K daily cap on Rapid?",a:"Do not make more than $10,000 in one day on Rapid sim funded. Excess is forfeited and triggers a risk review."}
    ]},
    {cat:"Path to Live",items:[
      {q:"How do I get a live account?",a:"Hit the cumulative payout cap ($100K on Pro, varies on others) or 5+ consecutive payouts. MFFU reviews and initiates the transition. Live accounts trade real capital."}
    ]}
  ],
  "Alpha Futures":[
    {cat:"Trading Hours",items:[
      {q:"When can I trade?",a:"CME Globex hours. All positions must be closed before session end. No overnight or weekend holds."},
    ]},
    {cat:"Drawdown & DLL",items:[
      {q:"How does drawdown work?",a:"EOD Trailing: $2,500(50K), $3,500(100K), $4,500(150K). Updates at session close only."},
      {q:"What is the Daily Loss Guard?",a:"A SOFT daily loss limit. If you hit it, trading pauses for the day but your account is NOT failed. This is a key differentiator — most firms hard-fail you on DLL breach."},
    ]},
    {cat:"Consistency",items:[
      {q:"Is there a consistency rule?",a:"50% during evaluation only. No consistency rule on funded accounts. This is one of the most trader-friendly funded structures available."},
    ]},
    {cat:"Profit Split",items:[
      {q:"What's the profit split?",a:"Progressive: 70% (payouts 1-2) → 80% (payouts 3-4) → 90% (payout 5+). Lower than competitors initially but reaches 90% with consistency."},
    ]},
    {cat:"Payouts",items:[
      {q:"How fast are payouts?",a:"Within 48 business hours. Advanced plan gets weekly processing."},
      {q:"Is there an activation fee?",a:"$149 activation on Standard plan. Varies by plan type."},
    ]},
    {cat:"EAs & Automation",items:[
      {q:"Can I use bots?",a:"No. EAs, bots, and automated trading are completely prohibited. Semi-auto with active human supervision may be allowed — check with Alpha directly."},
    ]},
    {cat:"Platforms",items:[
      {q:"What platforms are supported?",a:"NinjaTrader, Tradovate, TradingView, AlphaTicks (Quantower-based). Limited selection compared to some competitors."},
    ]}
  ],
  "Apex Trader Funding":[
    {cat:"Apex 4.0 Overview",items:[
      {q:"What changed with 4.0?",a:"Launched March 1, 2026. Complete rebuild: one-time fees (no subscriptions), two drawdown types (EOD/Intraday), 30-day eval expiry, 6-payout cap per PA, metals suspended, overnight banned, MAE/5:1 RR/one-direction rules removed, automated Deel payouts."},
      {q:"Are old accounts affected?",a:"No. Legacy accounts (pre-March 2026) stay on old rules permanently. No conversion path to 4.0. Can run legacy and 4.0 simultaneously."},
      {q:"What sizes are available?",a:"$25K, $50K, $100K, $150K only. The $75K, $250K, and $300K were removed in 4.0."}
    ]},
    {cat:"Drawdown Rules",items:[
      {q:"EOD vs Intraday — what's the difference?",a:"EOD: Drawdown recalculates once per day at 4:59 PM ET. Intraday dips that recover don't tighten your threshold. Includes DLL. Costs more. RECOMMENDED for most traders. Intraday: Drawdown trails peak equity in real-time including unrealized P&L. No DLL. Cheaper. Very aggressive."},
      {q:"When does the drawdown lock?",a:"Both types: locks at starting balance + $100 once your peak balance reaches that threshold. On a 50K, locks at $50,100 once peak hits $52,100."},
      {q:"Max loss amounts?",a:"25K: $1,000 | 50K: $2,000 | 100K: $3,000 | 150K: $4,000."}
    ]},
    {cat:"Daily Loss Limit",items:[
      {q:"Is there a DLL?",a:"EOD accounts only: $750(25K), $1K(50K), $1.5K(100K), $2K(150K). If hit, trading pauses for the day — does NOT fail your account. Intraday accounts have NO DLL."},
      {q:"Does DLL affect my drawdown?",a:"No. DLL and trailing drawdown are separate systems. Hitting DLL stops your day but doesn't move the drawdown floor."}
    ]},
    {cat:"Consistency Rule",items:[
      {q:"When does the 50% rule apply?",a:"Performance Account (funded) only. NOT during evaluation. No single profitable trading day can account for 50%+ of total net profit since last approved payout."},
      {q:"Can I pass the eval in one day?",a:"Yes. There's no consistency rule and no minimum trading day requirement during evaluation. Hit the target without breaching drawdown and you pass."}
    ]},
    {cat:"Payouts",items:[
      {q:"How does the payout ladder work?",a:"6-step system with increasing caps per payout. 100K example: ~$2K(1st) → $4K(6th). Max 6 payouts per PA lifetime, then account closes. 100% profit split up to $25K, then 90/10."},
      {q:"What are qualifying days?",a:"5 days with net profit above threshold ($200 for 50K, $250 for 100K, etc.). Days with losses or profit below threshold don't count."},
      {q:"How are payouts processed?",a:"Automated via Deel. 3-4 business days after approval. No manual review, no video reviews, no chart screenshots."},
      {q:"What is the Safety Net?",a:"For first 3 payouts, account balance must stay above trailing threshold + $100. This limits how much you can withdraw early on."}
    ]},
    {cat:"Activation Fee",items:[
      {q:"How much is the activation fee?",a:"$99 (EOD) or $79 (Intraday). Paid AFTER passing eval, not upfront. You have 7 days to pay once you pass. Never discounted."},
      {q:"Is it per account?",a:"Yes. Each PA requires its own activation fee. Running 20 accounts = 20 × $79-$99 = $1,580-$1,980 in activation fees alone."}
    ]},
    {cat:"Metals & Instruments",items:[
      {q:"Can I trade gold?",a:"NO. All metals suspended as of March 2026: Gold (GC), Silver (SI), Micro Gold (MGC), Copper (HG), Platinum (PL), Palladium (PA). No return date announced."},
      {q:"What CAN I trade?",a:"CME, CBOT, NYMEX, COMEX futures — equity index, energy, currencies, treasuries, agriculture. 46 markets minus metals."}
    ]},
    {cat:"Prohibited Activities",items:[
      {q:"What's banned?",a:"DCA (dollar-cost averaging) on Performance Accounts, overnight positions, trading metals, exceeding contract limits, windfall exploitation. Mandatory bracket orders enforced by platform."},
      {q:"Can I use EAs?",a:"Yes — automated trading permitted with monitoring. DCA strategies are specifically prohibited on funded accounts."},
      {q:"Is news trading allowed?",a:"Yes for normal strategies. 'Windfall' exploitation (deliberately targeting extreme news moves) is prohibited."}
    ]},
    {cat:"Account Limits",items:[
      {q:"How many accounts can I have?",a:"Up to 20 Performance Accounts simultaneously across all types (EOD, Intraday, Legacy combined). Highest in the industry."},
      {q:"What happens after 6 payouts?",a:"PA closes permanently. Purchase a new evaluation to start over. No direct path to live capital currently."},
      {q:"Is there a reset option?",a:"No. 4.0 eliminated resets. If you don't pass within 30 days, the eval expires. Buy a new one."}
    ]}
  ],
  "Top One Futures":[
    {cat:"Overview",items:[
      {q:"What plans are available?",a:"Eval (1-Step evaluation) and Prime (instant funding, no eval required). Both available in 50K and 100K. Eval also has 25K and 150K."},
    ]},
    {cat:"Rules",items:[
      {q:"What's the consistency rule?",a:"30% — strictest in the industry. No single day can exceed 30% of total profit. Applies on eval and funded."},
      {q:"Is there a DLL?",a:"Yes: $1,000(50K), $2,000(100K) on Eval. Same on Prime."},
      {q:"Drawdown type?",a:"EOD Trailing on all accounts."},
    ]},
    {cat:"Payouts",items:[
      {q:"How fast are payouts?",a:"1-3 business days. Request after 5 trading days."},
      {q:"Profit split?",a:"90/10 on all plans."},
    ]},
    {cat:"Trading Rules",items:[
      {q:"News trading allowed?",a:"Yes, no restrictions."},
      {q:"EAs allowed?",a:"Yes, automated trading permitted."},
      {q:"Overnight holds?",a:"No — must close by session end."},
    ]}
  ],
  "FundedNext Futures":[
    {cat:"Overview",items:[
      {q:"What plans are available?",a:"Rapid evaluation in 50K, 100K, 150K, 200K. Part of the FundedNext ecosystem (also offers forex)."},
    ]},
    {cat:"Rules",items:[
      {q:"Consistency rule?",a:"None. FundedNext Futures has no consistency rule on eval or funded. One of the few firms with zero consistency."},
      {q:"DLL?",a:"Yes: $1,250(50K), $2,000(100K). Hard DLL."},
      {q:"Drawdown?",a:"EOD Trailing. Updates at session close only."},
      {q:"Minimum trading days?",a:"No minimum on evaluation."},
    ]},
    {cat:"Payouts",items:[
      {q:"How fast?",a:"Within 24 hours. Among the fastest in the industry."},
      {q:"Split?",a:"80/20 initially → scales to 95/5 with milestone progression."},
    ]},
    {cat:"Trading",items:[
      {q:"News trading?",a:"Yes, fully allowed."},
      {q:"EAs?",a:"Yes, automated strategies permitted."},
      {q:"Platforms?",a:"NinjaTrader, Tradovate, TradingView."},
    ]}
  ],
  "Lucid Trading":[
    {cat:"Plans",items:[
      {q:"What plans are available?",a:"LucidFlex (eval, no DLL, no funded consistency), LucidPro (eval, 3-day payouts), LucidDirect (instant funding), LucidMaxx (invite-only live)."},
    ]},
    {cat:"Drawdown",items:[
      {q:"How does drawdown work?",a:"EOD Trailing on all plans. MLL: $1K(25K), $2K(50K), $3K(100K), $4.5K(150K)."},
      {q:"Does it lock?",a:"Flex: drawdown has a cap and becomes static. Direct: similar lock mechanism."},
    ]},
    {cat:"Consistency",items:[
      {q:"Consistency rules?",a:"Flex eval: 50%. Flex funded: NONE. Pro funded: 35%. Direct: 20%. Maxx: None."},
    ]},
    {cat:"Payouts",items:[
      {q:"How fast?",a:"Average 15 minutes via ACH/Plaid — fastest in the industry."},
      {q:"Frequency?",a:"Flex: every 5 profitable days. Pro: every 3 days. Direct: every 8 days."},
      {q:"Split?",a:"90/10 (Flex). 100% first $10K then 90/10 (Pro/Direct). 80/20 (LucidLive)."},
    ]},
    {cat:"Trading Rules",items:[
      {q:"News trading?",a:"Yes, fully allowed during economic releases."},
      {q:"EAs?",a:"Yes, algorithmic strategies permitted. HFT bots prohibited."},
      {q:"Overnight?",a:"No on sim-funded (close by 4:45 PM EST). Yes on LucidLive."},
      {q:"Activation fee?",a:"$0 — one-time purchase, no monthly fees, no activation fees."},
    ]},
    {cat:"Scaling & Live",items:[
      {q:"How many accounts?",a:"10 evaluations, 5 funded accounts per household."},
      {q:"Path to live?",a:"LucidLive after 5-6 payouts (varies by plan). $0 start + one-time bonus, 80/20 split, daily payouts, real capital."},
    ]}
  ],
  "Topstep":[
    {cat:"Evaluation",items:[
      {q:"How does the Trading Combine work?",a:"Single-step evaluation. Hit profit target ($3K/$6K/$9K) while respecting drawdown and consistency. Minimum 2 trading days. No maximum time limit."},
      {q:"Two paths — what's the difference?",a:"Standard Path: lower monthly fee + $149 activation when funded. No Activation Fee Path: higher monthly but $0 activation. Standard is cheaper if you pass quickly."},
    ]},
    {cat:"Drawdown",items:[
      {q:"How does the MLL work?",a:"EOD trailing — Maximum Loss Limit recalculates at session close only. Intraday dips that recover don't count. If your balance touches the MLL at any point, account is liquidated."},
      {q:"When does it lock?",a:"Locks once it reaches starting balance. Once your highest EOD balance pushes the floor to $50,000 on a 50K, it stops trailing permanently."},
    ]},
    {cat:"Consistency & DLL",items:[
      {q:"Consistency rule?",a:"50% — best single day cannot exceed 50% of total profits. Applies during eval AND funded."},
      {q:"DLL?",a:"Tier-based DLL that varies by account size and scaling tier. Pauses trading if hit — doesn't fail account."},
    ]},
    {cat:"Payouts",items:[
      {q:"Profit split?",a:"90/10 from day one for new traders (as of Feb 2026). Legacy accounts may still have 100% first $10K."},
      {q:"Speed?",a:"1-3 business days approval + 1-3 for delivery. $30 withdrawal fee per payout."},
      {q:"Frequency?",a:"Weekly. Up to 4x/month. Daily payouts after milestones. Capped at 50% of balance or $5,000 per withdrawal."},
    ]},
    {cat:"Trading Rules",items:[
      {q:"Close time?",a:"Must close all positions by 3:10 PM CT. Stricter than most firms."},
      {q:"News trading?",a:"Yes, allowed with no restrictions."},
      {q:"EAs?",a:"Generally not permitted. TopstepX has limited automation support."},
      {q:"Overnight?",a:"No. Must be flat by 3:10 PM CT."},
    ]},
    {cat:"Platform & Accounts",items:[
      {q:"Platforms?",a:"TopstepX (proprietary), NinjaTrader, Quantower, Tradovate, R Trader Pro. TopstepX has $0 commission."},
      {q:"Max accounts?",a:"Up to 5 funded accounts."},
      {q:"Path to live?",a:"Express Funded (sim) → Live Funded Account with real CME capital. NFA registered brokerage."},
    ]}
  ],
  "Take Profit Trader":[
    {cat:"Evaluation",items:[
      {q:"How does the eval work?",a:"1-Step evaluation. Hit profit target without breaching drawdown. Minimum 5 trading days. No maximum time limit."},
    ]},
    {cat:"Rules",items:[
      {q:"Drawdown?",a:"EOD Trailing on all accounts."},
      {q:"Consistency?",a:"50% on eval. 40% on funded."},
      {q:"DLL?",a:"None on evaluation accounts."},
    ]},
    {cat:"Payouts",items:[
      {q:"Speed?",a:"1-3 business days. PRO+ accounts get same-day requests."},
      {q:"Split?",a:"80/20 (PRO) → 90/10 (PRO+). Daily payouts available on PRO+."},
      {q:"Activation fee?",a:"~$130. One-time fee after passing."},
    ]},
    {cat:"Trading",items:[
      {q:"News trading?",a:"Restricted — some limitations around major events."},
      {q:"EAs?",a:"Generally restricted. Check current policy."},
      {q:"Platforms?",a:"NinjaTrader, Tradovate, +10 additional platforms."},
    ]}
  ],
  "Bulenox":[
    {cat:"Evaluation",items:[
      {q:"How does the eval work?",a:"1-Step evaluation. No minimum trading days. Choose EOD or Trailing drawdown type at purchase."},
    ]},
    {cat:"Rules",items:[
      {q:"Drawdown options?",a:"Choose at purchase: EOD trailing OR standard trailing. EOD only updates at session close. Standard trails in real-time."},
      {q:"Consistency?",a:"40% on eval and funded. No single day > 40% of total profit."},
      {q:"DLL?",a:"Yes: $500(25K), $1,100(50K), $2,000(100K), $2,200(150K), $2,500(250K)."},
    ]},
    {cat:"Payouts",items:[
      {q:"Speed?",a:"1-5 business days. Weekly payouts."},
      {q:"Split?",a:"100% of first $10K, then 90/10."},
      {q:"Reset fee?",a:"$75 — cheapest reset in the industry."},
    ]},
    {cat:"Trading",items:[
      {q:"News trading?",a:"Yes, fully allowed."},
      {q:"EAs?",a:"Yes, automated trading permitted."},
      {q:"Platforms?",a:"NinjaTrader, Tradovate, Bookmap, +1."},
      {q:"Max accounts?",a:"Multiple accounts allowed. Scaling up to $450K."},
    ]}
  ]
};



// ── FIRM LOGO ──
const FirmLogo = ({f,size=32}) => {
  const src=LOGOS[f.name];
  if(src) return <img src={src} alt={f.name} style={{width:size,height:size,borderRadius:Math.max(4,size/8),objectFit:'cover'}}/>;
  return <div style={{width:size,height:size,borderRadius:Math.max(4,size/8),background:f.brandGrad||f.color,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontFamily:'var(--heading)',fontWeight:800,fontSize:size*0.38}}>{f.initials}</div>;
};

// ── PARTICLES ──
const Particles = () => {
  const items = useMemo(()=>Array.from({length:10},(_,i)=>({
    id:i, left:Math.random()*100, dur:12+Math.random()*20, delay:Math.random()*15,
    color:i%3===0?'var(--cyan)':i%3===1?'var(--emerald)':'var(--orange)', size:2+Math.random()*2, opacity:0.3+Math.random()*0.4
  })),[]);
  return <>{items.map(p=><div key={p.id} className="particle" style={{left:p.left+'%',bottom:'-10px',width:p.size,height:p.size,background:p.color,opacity:p.opacity,animationDuration:p.dur+'s',animationDelay:p.delay+'s'}}/>)}</>;
};

// ── TICKER ──
const Ticker = () => {
  const msgs = useMemo(()=>{
    const m=[];
    FIRMS.forEach(f=>{const d=DEALS.find(x=>x.firm===f.name);if(d)m.push({name:f.name,pct:d.pct,flag:f.flag});});
    return [...m,...m,...m,...m];
  },[]);
  return (<div className="nav-ticker"><div className="nav-ticker-track">
    {msgs.map((t,i)=><span key={i} className="tick-item">
      <span className="tick-name">{t.flag} {t.name}</span>
      <b>{t.pct}</b> with PULSE
      {i<msgs.length-1&&<span className="tick-sep">●</span>}
    </span>)}
  </div></div>);
};

// ── BOTTOM FEED ──
const BottomFeed = () => {
  const msgs = useMemo(()=>{
    const items = [
      "🔥 @trader_mike just bought a Tradeify 50K — earned 250 Pulse Points",
      "⚡ 3 accounts funded in the last 60 seconds",
      "🎯 @nq_scalper stacked 5 accounts this week",
      "💰 $12,400 in payouts processed today",
      "🏆 Weekly giveaway: FREE 150K funded account",
      "📈 @delta_dom just passed Apex evaluation in 1 day",
      "🔥 @flow_trader claimed 500 Pulse Points",
      "⚡ Bulenox 75% OFF — most popular deal this week",
      "🎯 @momentum_rob funded on MFF Core — 2nd account this month",
    ];
    return [...items,...items,...items];
  },[]);
  return (<div className="bottom-feed"><div className="bf-track">
    {msgs.map((m,i)=><span key={i} className="bf-item">{m}</span>)}
  </div></div>);
};

// ── NAV ──
const NavBar = ({tab,setTab,setPage,page,user,onLogin,onLogout,setPpSection}) => {
  const [mob,setMob]=useState(false);
  const [showProfile,setShowProfile]=useState(false);
  const tabs=[["firms","Firms"],["challenges","Challenges"],["offers","Offers"],["giveaways","Giveaway"],["blog","Research"],["videos","Videos"],["points","Pulse Points"]];
  const go = k => {setPage("home");setTab(k);setMob(false);document.body.style.overflow='';setShowProfile(false);};
  return (<>
    <nav className="topnav">
      <div className="nav-left" onClick={()=>go("firms")}>
        <div className="nav-logo-p">P</div>
        <div className="nav-brand">The<span>Prop</span>Pulse</div>
      </div>
      <Ticker/>
      <div className="nav-right">
        {user&&<div className="nav-pts">⚡ 0</div>}
        {user?<div className="nav-avatar" onClick={()=>setShowProfile(!showProfile)}>{(user.email||"U")[0].toUpperCase()}</div>
          :<button className="nav-cta" onClick={onLogin}>Sign Up Free</button>}
        <button className="nav-burger" onClick={()=>{setMob(!mob);document.body.style.overflow=mob?'':'hidden'}}>☰</button>
      </div>
      {showProfile&&user&&<div style={{position:'absolute',top:60,right:24,background:'var(--bg1)',border:'1px solid var(--bdr2)',borderRadius:'var(--radius-sm)',padding:12,zIndex:101,minWidth:180}}>
        <div style={{fontSize:12,color:'var(--t3)',marginBottom:8,wordBreak:'break-all'}}>{user.email}</div>
        <button style={{width:'100%',padding:'8px 12px',background:'var(--surface)',border:'1px solid var(--bdr)',borderRadius:6,color:'var(--t2)',fontSize:12,fontWeight:600,cursor:'pointer',marginBottom:4}} onClick={()=>{setPage("account");setShowProfile(false)}}>My Account</button>
        <button style={{width:'100%',padding:'8px 12px',background:'none',border:'1px solid var(--bdr)',borderRadius:6,color:'var(--red)',fontSize:12,fontWeight:600,cursor:'pointer'}} onClick={onLogout}>Sign Out</button>
      </div>}
    </nav>
    {mob&&<div className="mob-overlay">
      {tabs.map(([k,l])=><button key={k} className={tab===k?'on':''} onClick={()=>go(k)}>{l}</button>)}
      {user&&<button onClick={()=>{setPage("account");setMob(false);document.body.style.overflow=''}}>My Account</button>}
      {!user&&<button onClick={()=>{onLogin();setMob(false);document.body.style.overflow=''}}>Sign Up / Login</button>}
    </div>}
  </>);
};

// ── LEFT SIDEBAR ──
const LeftSidebar = ({tab,setTab}) => {
  const items = [
    {key:"firms",icon:"📊",label:"Firms"},
    {key:"challenges",icon:"🎯",label:"Challenges"},
    {key:"offers",icon:"🔥",label:"Offers"},
    {key:"giveaways",icon:"🎁",label:"Giveaways"},
    {key:"blog",icon:"📰",label:"Research"},
    {key:"videos",icon:"🎬",label:"Videos"},
    {key:"points",icon:"⭐",label:"Pulse Points"},
  ];
  return (<div className="sidebar-l">
    <div className="sb-label">Navigate</div>
    {items.map(i=><div key={i.key} className={`sb-item${tab===i.key?' on':''}`} onClick={()=>setTab(i.key)}>
      <span className="sb-icon">{i.icon}</span>{i.label}
    </div>)}
    <div style={{flex:1}}/>
    <div style={{padding:'16px 24px',fontSize:11,color:'var(--t5)'}}>ThePropPulse v2.0</div>
  </div>);
};

// ── RIGHT SIDEBAR (Rewards Hub) ──
const RightSidebar = ({user,onLogin}) => (
  <div className="sidebar-r">
    <div style={{fontFamily:'var(--heading)',fontSize:14,fontWeight:700,color:'var(--t2)',letterSpacing:'.5px'}}>⚡ REWARDS HUB</div>
    <div className="rw-pts">
      <div className="rw-pts-num">0</div>
      <div className="rw-pts-label">Pulse Points</div>
      {!user&&<button className="btn-primary" style={{marginTop:14,fontSize:12,padding:'10px 20px'}} onClick={onLogin}>Sign Up to Earn</button>}
    </div>
    <div className="rw-tier">
      <div className="rw-tier-title">Tier Progress</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <span style={{fontFamily:'var(--heading)',fontSize:14,fontWeight:700,color:'var(--emerald)'}}>Bronze</span>
        <span style={{fontSize:11,color:'var(--t4)'}}>0 / 500 pts</span>
      </div>
      <div className="rw-tier-bar"><div className="rw-tier-fill" style={{width:'0%'}}/></div>
      <div className="rw-tier-labels"><span>Bronze</span><span>Silver</span><span>Gold</span><span>Diamond</span></div>
    </div>
    <div>
      <div style={{fontFamily:'var(--heading)',fontSize:12,fontWeight:700,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'1px',marginBottom:10}}>Recent Activity</div>
      <div className="rw-feed">
        <div className="rw-feed-item"><b>@trader_mike</b> earned <span className="orange">250 pts</span></div>
        <div className="rw-feed-item"><b>@nq_scalper</b> redeemed <span className="orange">Free 50K</span></div>
        <div className="rw-feed-item"><b>@delta_dom</b> earned <span className="orange">500 pts</span></div>
        <div className="rw-feed-item"><b>@flow_pro</b> reached <span className="orange">Silver tier</span></div>
        <div className="rw-feed-item"><b>@pulse_king</b> earned <span className="orange">150 pts</span></div>
      </div>
    </div>
  </div>
);

// ── FIRM CARDS ──
const FirmCards = ({firms,onSelect,user,compareFirms=[],toggleCompare}) => (
  <div className="cards-grid">{firms.map(f=>{
    const ps=calcPulse(f.rating,f.reviews,f.name);
    const deal=DEALS.find(d=>d.firm===f.name);
    const hasAff=!!AFFILIATE_LINKS[f.name];
    const isComparing=compareFirms.some(x=>x.id===f.id);
    const barColor=ps>=92?'var(--orange)':ps>=88?'var(--cyan)':ps>=84?'var(--emerald)':'var(--t4)';
    return (<div key={f.id} className="fcard" style={{'--card-accent':f.color,'--card-glow':f.color+'20',...(isComparing?{borderColor:f.color,boxShadow:'0 0 8px '+f.color+'40'}:{})}}>
      <div className="fcard-header" onClick={()=>onSelect(f)}>
        <div className="fcard-logo"><FirmLogo f={f} size={48}/></div>
        <div className="fcard-info">
          <div className="fcard-name">{f.name}{TOP_PICKS.has(f.name)&&<span className="tp">★</span>}</div>
          <div className="fcard-sub">{f.flag} {f.hq} · Est. {f.founded}</div>
        </div>
        {deal&&<span className="fcard-deal">{deal.pct}</span>}
      </div>
      <div className="fcard-rating" onClick={()=>onSelect(f)}>
        <span style={{fontFamily:'var(--mono)',fontSize:14,fontWeight:800,color:f.color}}>{f.rating}</span>
        <span className="stars">{'★'.repeat(Math.floor(f.rating))}</span>
        <span className="rv">{f.reviews>0?f.reviews.toLocaleString()+' reviews':'New'}</span>
        {f.bestFor&&<span className="best-for" style={{background:f.color+'18',border:'1px solid '+f.color+'35',color:f.color,boxShadow:'0 0 8px '+f.color+'20'}}>{f.bestFor}</span>}
      </div>
      <div className="fcard-desc" onClick={()=>onSelect(f)}>{f.desc}</div>
      <div className="fcard-specs">
        <div className="fcard-spec"><div className="fcard-spec-label">Max Alloc</div><div className="fcard-spec-val" style={{color:f.color}}>{f.maxAlloc}</div></div>
        <div className="fcard-spec"><div className="fcard-spec-label">Split</div><div className="fcard-spec-val">{f.split.split('→')[0].trim()}</div></div>
        <div className="fcard-spec"><div className="fcard-spec-label">Payout</div><div className="fcard-spec-val">{f.paySpeed}</div></div>
      </div>
      <div className="fcard-pulse">
        <div className="fcard-pulse-label">Pulse</div>
        <div className="fcard-pulse-score" style={{color:barColor}}>{ps}</div>
        <div className="fcard-pulse-bar"><div className="fcard-pulse-fill" style={{width:ps+'%',background:barColor}}/></div>
      </div>
      <div className="fcard-actions">
        <button className="fcard-btn-buy" onClick={e=>{e.stopPropagation();if(hasAff){trackClick(f.name,user?.id)}else{const fp=FIRM_PROFILES[f.name];window.open('https://'+(fp?.website||f.name.toLowerCase().replace(/\s+/g,'')+'.com'),'_blank')}}}>
          Buy with PULSE — Earn Points
        </button>
        <button className="fcard-btn-detail" onClick={()=>onSelect(f)}>Details</button>
        {toggleCompare&&<button className="cmp-tog" style={{...(isComparing?{background:f.color+'25',borderColor:f.color+'50',color:f.color}:{})}} onClick={e=>{e.stopPropagation();toggleCompare(f)}}>{isComparing?'✓':'+'}</button>}
      </div>
    </div>);
  })}</div>
);

// ── FIRM TABLE ──
const FirmTable = ({firms,onSelect}) => {
  const [copied,setCopied]=useState(false);
  return (<div className="tbl-wrap"><table className="tbl"><thead><tr>
    <th>Firm</th><th>Pulse</th><th>Rating</th><th>Country</th><th>Platforms</th><th>Max Alloc</th><th>Deal</th><th></th>
  </tr></thead><tbody>{firms.map(f=>{
    const ps=calcPulse(f.rating,f.reviews,f.name);
    const deal=DEALS.find(d=>d.firm===f.name);
    return (<tr key={f.id} onClick={()=>onSelect(f)} style={{cursor:'pointer'}}>
      <td><div style={{display:'flex',alignItems:'center',gap:10}}><FirmLogo f={f} size={34}/><div><div style={{fontWeight:700,fontSize:13}}>{f.name}{TOP_PICKS.has(f.name)&&<span className="tp" style={{marginLeft:3}}>★</span>}</div><div style={{fontSize:10,color:'var(--t4)'}}>{f.hq}</div></div></div></td>
      <td><span className="mono" style={{fontWeight:800,color:pulseColor(ps)}}>{ps}</span></td>
      <td><span style={{fontWeight:700}}>{f.rating}</span><span style={{fontSize:10,color:'var(--t4)',marginLeft:4}}>{f.reviews.toLocaleString()}</span></td>
      <td>{f.flag} {f.country}</td>
      <td style={{fontSize:10}}>{f.platforms.slice(0,3).join(', ')}</td>
      <td><span className="mono" style={{fontWeight:700}}>{f.maxAlloc}</span></td>
      <td>{deal?<span className="offer-code" style={{fontSize:11,padding:'4px 10px'}} onClick={e=>{e.stopPropagation();copyToClipboard(deal.code);setCopied(true);setTimeout(()=>setCopied(false),1400)}}>{deal.pct}</span>:'—'}</td>
      <td><button className="fcard-btn-detail" style={{fontSize:11,padding:'6px 12px'}} onClick={e=>{e.stopPropagation();onSelect(f)}}>View</button></td>
    </tr>);
  })}</tbody></table>{copied&&<div className="toast">PULSE code copied</div>}</div>);
};

// ── CHALLENGES TAB ──
const ChallengesTab = ({onSelect}) => {
  const [filters,setFilters]=useState({instant:false,noDLL:false,noConsistency:false,newsOk:false,eaOk:false,size:"50K"});
  const [phase,setPhase]=useState("eval");
  const toggle=k=>setFilters(p=>({...p,[k]:!p[k]}));
  const setSize=v=>setFilters(p=>({...p,size:p.size===v?"":v}));
  const allSizes=[...new Set(CHALLENGES.map(c=>c.size))].sort((a,b)=>parseInt(a)-parseInt(b));
  const getCh=c=>{if(phase!=="funded")return c;const key=c.firm+"|"+c.plan;const ov=FUNDED_OVERRIDES[key];return ov?{...c,...ov}:c;};
  const filtered=CHALLENGES.filter(c=>{
    if(filters.instant&&!c.instant)return false;
    if(filters.size&&c.size!==filters.size)return false;
    const ch=getCh(c);
    if(filters.noDLL&&ch.dll!=="None")return false;
    if(filters.noConsistency&&ch.consistency!=="None"&&ch.consistency!=="None (funded)"&&ch.consistency!=="None (Flex)")return false;
    if(filters.newsOk&&!c.news)return false;
    if(filters.eaOk&&!c.ea)return false;
    return true;
  });
  const clearAll=()=>setFilters({instant:false,noDLL:false,noConsistency:false,newsOk:false,eaOk:false,size:"50K"});
  const activeCount=Object.values(filters).filter(v=>v===true).length+(filters.size?1:0);
  return (<div>
    <div className="ch-hero">
      <div className="sec-hdr"><div>
        <div className="sec-title">Challenge Comparison Engine</div>
        <div className="sec-sub">Filter & compare every major futures prop firm side-by-side</div>
      </div></div>
    </div>
    <div className="phase-tabs">
      <button className={`phase-tab${phase==="eval"?" on":""}`} onClick={()=>setPhase("eval")}>Evaluation Phase</button>
      <button className={`phase-tab${phase==="funded"?" on":""}`} onClick={()=>setPhase("funded")}>Funded Phase</button>
    </div>
    <div className="ch-filters">
      <button className={`ch-toggle${filters.instant?" on":""}`} onClick={()=>toggle("instant")}>⚡ Instant Fund</button>
      <button className={`ch-toggle${filters.noDLL?" on":""}`} onClick={()=>toggle("noDLL")}>No Daily Loss Limit</button>
      <button className={`ch-toggle${filters.noConsistency?" on":""}`} onClick={()=>toggle("noConsistency")}>No Consistency Rule</button>
      <button className={`ch-toggle${filters.newsOk?" on":""}`} onClick={()=>toggle("newsOk")}>News Trading OK</button>
      <button className={`ch-toggle${filters.eaOk?" on":""}`} onClick={()=>toggle("eaOk")}>EAs/Bots OK</button>
      <span className="ch-divider"/>
      <span className="ch-filter-label">Size</span>
      {allSizes.map(s=><button key={s} className={`ch-toggle${filters.size===s?" on":""}`} onClick={()=>setSize(s)}>{s}</button>)}
      {activeCount>0&&<button className="ch-clear" onClick={clearAll}>Clear all</button>}
    </div>
    <div className="ch-count">Showing <b>{filtered.length}</b> of {CHALLENGES.length} challenges</div>
    {filtered.length===0?<div className="ch-empty">No plans match your filters — try loosening your criteria.</div>
    :<div className="ch-list">
      {filtered.map((c,i)=>{
        const ch=getCh(c);const f=FIRMS.find(ff=>ff.name===c.firm);
        const noDLL=ch.dll==="None"||ch.dll==="None (Flex)"||ch.dll==="None (funded)";
        const accent=f?f.color:'var(--cyan)';
        return (<div key={i} className="ch-card" style={{'--card-accent':accent}} onClick={()=>{if(f)onSelect(f)}}>
          <div className="ch-firm">
            {f&&<div className="ch-firm-logo"><FirmLogo f={f} size={44}/></div>}
            <div className="ch-firm-info">
              <div className="ch-firm-name">{c.firm}</div>
              <div><span className="ch-firm-plan">{c.plan}</span><span className="ch-firm-size">{c.size}</span></div>
            </div>
          </div>
          <div className="ch-stat">
            <div className="ch-stat-label">Price</div>
            <div className="ch-stat-val price">{c.price}</div>
          </div>
          <div className="ch-stat">
            <div className="ch-stat-label">Target</div>
            <div className="ch-stat-val">{ch.target}</div>
          </div>
          <div className="ch-stat">
            <div className="ch-stat-label">Max Loss</div>
            <div className="ch-stat-val">{ch.maxLoss}</div>
          </div>
          <div className="ch-stat">
            <div className="ch-stat-label">Daily Loss Limit</div>
            <div className={`ch-stat-val ${noDLL?"good":"warn"}`}>{ch.dll}</div>
            <div className="ch-stat-sub">{ch.split} split · {ch.minDays}</div>
          </div>
          <button className="ch-cta" onClick={e=>{e.stopPropagation();if(f)onSelect(f)}}>View →</button>
        </div>);
      })}
    </div>}
  </div>);
};

// ── OFFERS TAB ──
const OffersTab = ({user}) => {
  const [copied,setCopied]=useState(null);
  return (<div>
    <div className="sec-hdr"><div><div className="sec-title">Exclusive Offers</div><div className="sec-sub">{DEALS.length} active deals — use code PULSE at checkout</div></div></div>
    <div className="offers-list">{DEALS.map((d,i)=>{
      const f=FIRMS.find(ff=>ff.name===d.firm);
      const hasAff=!!AFFILIATE_LINKS[d.firm];
      return (<div key={i} className="offer-row" style={{borderLeft:'3px solid '+(f?f.color:'var(--cyan)'),'--card-accent':f?f.color:'var(--cyan)'}}>
        {f&&<FirmLogo f={f} size={34}/>}
        <div className="offer-pct">{d.pct}</div>
        <div className="offer-info">
          <div className="offer-firm">{d.firm}{d.tag&&<span className="offer-tag">{d.tag}</span>}</div>
          <div className="offer-desc">{d.desc}{d.expires&&<span style={{color:'var(--amber)',marginLeft:4}}>Ends {d.expires}</span>}</div>
        </div>
        <div className="offer-code" onClick={()=>{copyToClipboard(d.code);setCopied(i);setTimeout(()=>setCopied(null),1400)}}>{copied===i?'✓ Copied':d.code}</div>
        {hasAff&&<button className="fcard-btn-buy" style={{padding:'8px 16px',fontSize:12}} onClick={()=>trackClick(d.firm,user?.id)}>Get Deal</button>}
      </div>);
    })}</div>
    {copied!==null&&<div className="toast">Code copied</div>}
  </div>);
};

// ── GIVEAWAY TAB ──
const GiveawaysTab = () => (
  <div style={{maxWidth:700,margin:'0 auto'}}>
    <div className="sec-hdr"><div><div className="sec-title">Weekly Giveaway</div><div className="sec-sub">Buy with code PULSE for automatic entry</div></div></div>
    <div className="gw-prize">
      <div style={{fontSize:11,fontWeight:700,color:'var(--cyan)',textTransform:'uppercase',letterSpacing:2}}>This Week's Prize</div>
      <div style={{fontFamily:'var(--heading)',fontSize:22,fontWeight:800,marginTop:8}}>Free 150K Funded Account</div>
      <div className="gw-val">$150K</div>
      <div style={{fontSize:12,color:'var(--t3)'}}>Winner announced Friday at 5PM EST on Discord & YouTube</div>
    </div>
    <div className="gw-steps">
      {[["01","Purchase Any Account","From any listed firm"],["02","Use Code PULSE","Get your discount + qualify"],["03","Submit Proof","Screenshot of order"],["04","Win","Drawn every Friday"]].map(([n,t,d])=>(
        <div key={n} className="gw-step"><div className="gw-step-n">{n}</div><div className="gw-step-t">{t}</div><div className="gw-step-d">{d}</div></div>
      ))}
    </div>
    <div style={{textAlign:'center',margin:'20px 0'}}>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeBd3EkO_rPjqMC2f7G9Z2S7dPquxJtnBCkXpKHsAULHavfXQ/viewform" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
        <button className="gw-btn">Submit Your Entry</button>
      </a>
    </div>
    <div className="gw-rules"><h4>Rules</h4><ul>
      {["Purchase through a listed firm","Code PULSE applied at checkout","One entry per purchase — more purchases = more entries","Screenshot must show discount code","Winners drawn every Friday, announced on Discord & YouTube","Entries Mon–Sun eligible for that week's drawing"].map((r,i)=><li key={i}>{r}</li>)}
    </ul></div>
  </div>
);

// ── BLOG TAB ──
const BlogTab = ({onSelect}) => {
  const catColor = c => ({Industry:'#a855f7',Comparison:'#0ea5e9',Strategy:'#06b6d4',News:'#06b6d4',Guide:'#ffbe0b',Education:'#ff6b6b'}[c]||'#06b6d4');
  return (<div>
    <div className="sec-hdr"><div><div className="sec-title">Research & Analysis</div><div className="sec-sub">Data-driven insights for prop traders</div></div></div>
    <div className="blog-grid">{BLOG.map(p=>{
      const cc=catColor(p.cat);
      return (<div key={p.id} className="blog-card" style={{'--card-accent':cc,'--card-glow':cc+'20',borderLeft:'3px solid '+cc}} onClick={()=>onSelect(p)}>
        <div className="blog-cat" style={{color:cc}}>{p.cat}</div>
        <div className="blog-title">{p.title}</div>
        <div className="blog-excerpt">{p.excerpt}</div>
        <div className="blog-date">{p.date} · {p.time} read</div>
      </div>);
    })}</div>
  </div>);
};

// ── VIDEOS TAB ──
const VideosTab = () => {
  const [vFilter,setVFilter]=useState("all");
  const filtered=VIDEOS.filter(v=>vFilter==="all"||v.firm===vFilter||v.cat===vFilter);
  const isPlaceholder=id=>id.startsWith("PLACEHOLDER");
  return (<div>
    <div className="sec-hdr"><div>
      <div className="sec-title">🎬 Trading Videos & Education</div>
      <div className="sec-sub">Curated videos on prop firms, futures trading strategies, and risk management</div>
    </div>
      <a href="https://www.youtube.com/@ThePropPulse" target="_blank" rel="noopener" style={{display:'inline-flex',alignItems:'center',gap:6,background:'#ff0000',color:'#fff',fontSize:11,fontWeight:700,padding:'7px 14px',borderRadius:6,textDecoration:'none'}}>
        ▶ Subscribe on YouTube
      </a>
    </div>
    <div className="filters">
      <button className={`f-chip ${vFilter==="all"?"on":""}`} onClick={()=>setVFilter("all")}>All</button>
      {[...new Set(VIDEOS.filter(v=>v.firm).map(v=>v.firm))].map(f=><button key={f} className={`f-chip ${vFilter===f?"on":""}`} onClick={()=>setVFilter(f)}>{f}</button>)}
      {[...new Set(VIDEOS.map(v=>v.cat))].map(c=><button key={c} className={`f-chip ${vFilter===c?"on":""}`} onClick={()=>setVFilter(c)}>{c}</button>)}
    </div>
    {filtered.length===0?<div style={{textAlign:'center',padding:40,color:'var(--t4)'}}>No videos match this filter.</div>
    :<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:14}}>
      {filtered.map((v,i)=>{
        const f=v.firm?FIRMS.find(ff=>ff.name===v.firm):null;
        return (<div key={i} style={{background:'var(--surface)',border:'1px solid var(--bdr)',borderRadius:'var(--radius)',overflow:'hidden'}}>
          <div style={{position:'relative',paddingBottom:'56.25%',background:'var(--bg3)'}}>
            {isPlaceholder(v.id)?<div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8}}><div style={{fontSize:40,opacity:0.3}}>🎬</div><div style={{fontSize:12,color:'var(--t4)',fontWeight:600}}>Coming Soon</div></div>
            :<iframe src={"https://www.youtube.com/embed/"+v.id} style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',border:'none'}} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={v.title}/>}
          </div>
          <div style={{padding:'14px 16px'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
              {f&&<span style={{fontSize:9,fontWeight:700,color:f.color,background:f.color+'15',border:'1px solid '+f.color+'25',padding:'2px 7px',borderRadius:4}}>{f.name}</span>}
              <span style={{fontSize:9,fontWeight:600,color:'var(--t4)',background:'var(--bg3)',padding:'2px 7px',borderRadius:4}}>{v.cat}</span>
              {v.duration&&<span style={{fontSize:9,fontFamily:'var(--mono)',color:'var(--t4)',marginLeft:'auto'}}>{v.duration}</span>}
            </div>
            <div style={{fontSize:14,fontWeight:700,color:'var(--t1)',lineHeight:1.35}}>{v.title}</div>
            <div style={{fontSize:11,color:'var(--t4)',marginTop:4}}>{v.date}</div>
          </div>
        </div>);
      })}
    </div>}
  </div>);
};

// ── BLOG POST PAGE ──
const BlogPostPage = ({post,goBack}) => {
  if(!post) return null;
  const paras = post.body.split("\n\n");
  return (<div style={{maxWidth:700,margin:'0 auto',padding:'0 20px'}}>
    <button className="det-back" onClick={goBack}>← Back to Research</button>
    <div style={{marginTop:8}}>
      <div className="blog-cat" style={{marginBottom:10,display:'inline-block',color:post.color}}>{post.cat}</div>
      <h1 style={{fontFamily:'var(--heading)',fontSize:28,fontWeight:800,lineHeight:1.3,margin:'8px 0 12px'}}>{post.title}</h1>
      <div style={{display:'flex',gap:10,fontSize:11,color:'var(--t4)',marginBottom:24,paddingBottom:16,borderBottom:'1px solid var(--bdr)'}}>
        <span>ThePropPulse</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.time} read</span>
      </div>
      <div className="blog-body">
        {paras.map((p,i)=>{
          if(p.startsWith("**")&&p.endsWith("**")) return <h2 key={i} className="blog-h2">{p.replace(/\*\*/g,"")}</h2>;
          const fmt=p.split("**").map((s,j)=>j%2===1?<strong key={j}>{s}</strong>:<span key={j}>{s}</span>);
          return <p key={i} className="blog-p">{fmt}</p>;
        })}
      </div>
      <div style={{marginTop:32,padding:24,background:'var(--surface)',border:'1px solid var(--bdr2)',borderRadius:'var(--radius)',textAlign:'center'}}>
        <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>Ready to get funded?</div>
        <div style={{fontSize:12,color:'var(--t3)',marginBottom:12}}>Use code <b style={{color:'var(--orange)',fontFamily:'var(--mono)'}}>PULSE</b> at any firm for an exclusive discount.</div>
        <button className="gw-btn" style={{fontSize:13,padding:'10px 24px'}} onClick={goBack}>Compare All Firms</button>
      </div>
    </div>
  </div>);
};

// ── DETAIL PAGE ──
const DetailPage = ({firm,goBack}) => {
  if(!firm)return null;
  const ps=calcPulse(firm.rating,firm.reviews,firm.name);
  const deal=DEALS.find(d=>d.firm===firm.name);
  const profile=FIRM_PROFILES[firm.name]||{};
  const hasAff=!!AFFILIATE_LINKS[firm.name];
  const challenges=CHALLENGES.filter(c=>c.firm===firm.name);
  return (<div style={{maxWidth:900,margin:'0 auto',padding:'0 20px'}}>
    <button className="det-back" onClick={goBack}>← Back to Firms</button>
    <div className="det-hero" style={{borderColor:firm.color+'30'}}>
      <div className="det-logo"><FirmLogo f={firm} size={72}/></div>
      <div style={{flex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
          <h1 style={{fontFamily:'var(--heading)',fontSize:28,fontWeight:800}}>{firm.name}</h1>
          {TOP_PICKS.has(firm.name)&&<span style={{fontSize:14,color:'var(--orange)',textShadow:'0 0 8px rgba(255,149,0,0.4)'}}>★ Top Pick</span>}
        </div>
        <div style={{fontSize:13,color:'var(--t3)',marginBottom:8}}>{firm.flag} {firm.hq} · Founded {firm.founded} · {firm.platforms.join(', ')}</div>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <span style={{fontFamily:'var(--mono)',fontSize:18,fontWeight:800,color:firm.color}}>{firm.rating}</span>
          <span style={{color:'#facc15'}}>{'★'.repeat(Math.floor(firm.rating))}</span>
          <span style={{fontSize:12,color:'var(--t4)'}}>{firm.reviews.toLocaleString()} reviews</span>
          <span style={{fontFamily:'var(--mono)',fontSize:16,fontWeight:800,color:pulseColor(ps)}}>Pulse {ps}</span>
        </div>
      </div>
      <div style={{textAlign:'right'}}>
        {deal&&<div style={{fontFamily:'var(--mono)',fontSize:24,fontWeight:900,color:'var(--orange)',textShadow:'0 0 12px rgba(255,149,0,0.4)',marginBottom:4}}>{deal.pct}</div>}
        <button className="fcard-btn-buy" style={{fontSize:14,padding:'12px 24px'}} onClick={()=>{if(hasAff)trackClick(firm.name);else window.open('https://'+(profile.website||''),'_blank')}}>
          Get Deal with PULSE
        </button>
      </div>
    </div>
    <p style={{fontSize:15,color:'var(--t2)',lineHeight:1.7,marginBottom:24}}>{firm.desc}</p>
    <div className="det-grid">
      {[["Max Allocation",firm.maxAlloc],["Profit Split",firm.split],["Payout Speed",firm.paySpeed],["Min Payout",firm.minPayout],["Drawdown Type",firm.drawdownType],["Daily Loss Limit",firm.dailyDD||"None"],["Max Drawdown",firm.maxDD],["Consistency Rule",firm.hasConsistency?firm.consistencyPct:"None"],["Min Days to Pass",firm.minDaysPass],["News Trading",firm.newsTrading?"✓ Allowed":"✗ Not Allowed"],["EAs / Bots",firm.eaAllowed?"✓ Allowed":"✗ Not Allowed"],["Instant Funding",firm.instantFund?"✓ Available":"✗ Eval Required"],["Reset Fee",firm.reset],["Account Sizes",firm.sizes?.join(", ")]].map(([l,v],i)=>(
        <div key={i} className="det-card">
          <div className="det-card-label">{l}</div>
          <div className="det-card-val" style={{...(v?.includes?.("✓")?{color:'var(--emerald)'}:v?.includes?.("✗")?{color:'var(--red)'}:{})}}>{v||"—"}</div>
        </div>
      ))}
    </div>
    {challenges.length>0&&<div className="det-section">
      <h3>Available Plans</h3>
      <div className="ch-tbl-wrap"><table className="ch-tbl"><thead><tr>
        <th>Plan</th><th>Size</th><th>Price</th><th>Target</th><th>Max Loss</th><th>DLL</th><th>Consistency</th><th>Split</th>
      </tr></thead><tbody>{challenges.map((c,i)=>(
        <tr key={i}><td style={{fontWeight:700}}>{c.plan}</td><td>{c.size}</td><td style={{fontSize:11}}>{c.price}</td><td>{c.target}</td><td>{c.maxLoss}</td>
          <td className={c.dll==="None"?"good":""}>{c.dll}</td>
          <td className={c.consistency==="None"?"good":""}>{c.consistency}</td><td>{c.split}</td></tr>
      ))}</tbody></table></div>
    </div>}
    {profile.overview&&<div className="det-section">
      <h3>Firm Overview</h3>
      <p style={{fontSize:14,color:'var(--t2)',lineHeight:1.7}}>{profile.overview}</p>
    </div>}
    {profile.pros&&<div className="det-section">
      <h3 style={{color:'var(--emerald)'}}>✓ Pros</h3>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>{profile.pros.map((p,i)=><div key={i} style={{fontSize:13,color:'var(--t2)',padding:'8px 12px',background:'var(--surface)',border:'1px solid rgba(0,212,165,0.15)',borderRadius:'var(--radius-xs)'}}>{p}</div>)}</div>
    </div>}
    {profile.cons&&<div className="det-section">
      <h3 style={{color:'var(--red)'}}>✗ Cons</h3>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>{profile.cons.map((p,i)=><div key={i} style={{fontSize:13,color:'var(--t2)',padding:'8px 12px',background:'var(--surface)',border:'1px solid rgba(255,71,87,0.15)',borderRadius:'var(--radius-xs)'}}>{p}</div>)}</div>
    </div>}
    <div style={{height:40}}/>
  </div>);
};

// ── NEWSLETTER ──
const Newsletter = () => {
  const [email,setEmail]=useState("");const [done,setDone]=useState(false);
  const submit=async()=>{if(!email)return;try{await supabase.from("newsletter").insert({email});setDone(true)}catch(e){setDone(true)}};
  return (<div className="newsletter">
    <div className="nl-title">Stay in the <span style={{color:'var(--cyan)'}}>Loop</span></div>
    <div className="nl-sub">Weekly deals, new firm reviews, and giveaway winners straight to your inbox.</div>
    {done?<div style={{color:'var(--emerald)',fontWeight:700}}>✓ You're in! Check your inbox.</div>
    :<div className="nl-form"><input className="nl-input" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)}/><button className="gw-btn" style={{fontSize:13,padding:'12px 20px',whiteSpace:'nowrap'}} onClick={submit}>Subscribe</button></div>}
  </div>);
};

// ── AUTH MODAL ──
const AuthModal = ({onClose,onAuth}) => {
  const [mode,setMode]=useState("login");const [email,setEmail]=useState("");const [pass,setPass]=useState("");const [err,setErr]=useState("");const [loading,setLoading]=useState(false);
  const submit=async()=>{setErr("");setLoading(true);try{
    if(mode==="signup"){const {data,error}=await supabase.auth.signUp({email,password:pass});if(error)throw error;if(data.user)onAuth(data.user)}
    else{const {data,error}=await supabase.auth.signInWithPassword({email,password:pass});if(error)throw error;if(data.user)onAuth(data.user)}
  }catch(e){setErr(e.message)}finally{setLoading(false)}};
  return (<div className="auth-overlay" onClick={onClose}>
    <div className="auth-modal" onClick={e=>e.stopPropagation()}>
      <button className="auth-close" onClick={onClose}>✕</button>
      <div className="auth-title">{mode==="login"?"Welcome Back":"Create Account"}</div>
      {err&&<div className="auth-err">{err}</div>}
      <input className="auth-input" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="auth-input" placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()}/>
      <button className="auth-btn" style={{background:'linear-gradient(135deg,var(--cyan),var(--emerald))',color:'var(--bg)'}} onClick={submit} disabled={loading}>{loading?"...":(mode==="login"?"Sign In":"Sign Up")}</button>
      <div className="auth-toggle">{mode==="login"?"Don't have an account? ":"Already have an account? "}<span onClick={()=>{setMode(mode==="login"?"signup":"login");setErr("")}}>{mode==="login"?"Sign Up":"Sign In"}</span></div>
    </div>
  </div>);
};

// ── ACCOUNT PAGE ──
const AccountPage = ({user,goBack}) => {
  if(!user)return <div style={{textAlign:'center',padding:60}}><p style={{color:'var(--t3)'}}>Please sign in to view your account.</p></div>;
  return (<div style={{maxWidth:600,margin:'0 auto'}}>
    <button className="det-back" onClick={goBack}>← Back</button>
    <h2 style={{fontFamily:'var(--heading)',fontSize:24,fontWeight:700,margin:'20px 0 16px'}}>My Account</h2>
    <div className="acct-card">
      <div style={{fontSize:12,fontWeight:700,textTransform:'uppercase',letterSpacing:1,color:'var(--t4)',marginBottom:8}}>Email</div>
      <div style={{fontSize:15,color:'var(--t1)'}}>{user.email}</div>
    </div>
    <div className="acct-card">
      <div style={{fontSize:12,fontWeight:700,textTransform:'uppercase',letterSpacing:1,color:'var(--t4)',marginBottom:8}}>Pulse Points</div>
      <div style={{fontFamily:'var(--mono)',fontSize:32,fontWeight:900,color:'var(--orange)',textShadow:'0 0 12px rgba(255,149,0,0.3)'}}>0</div>
      <div style={{fontSize:12,color:'var(--t3)',marginTop:4}}>Earn points by purchasing with code PULSE and submitting proof.</div>
    </div>
    <div className="acct-card">
      <div style={{fontSize:12,fontWeight:700,textTransform:'uppercase',letterSpacing:1,color:'var(--t4)',marginBottom:8}}>Member Since</div>
      <div style={{fontSize:15,color:'var(--t1)'}}>{new Date(user.created_at).toLocaleDateString()}</div>
    </div>
  </div>);
};

// ── REWARD / LOYALTY CONSTANTS ──
const POINT_VALUES = {"25K":50,"50K":100,"75K":125,"100K":150,"150K":200,"200K":250,"250K":300,"300K":350};
const REWARD_TIERS = [
  {name:"Free 25K Evaluation",pts:10000,desc:"Any partner firm",type:"eval",evalSize:"25K",icon:"\u{1F4CA}",tier:"bronze",cat:"eval"},
  {name:"Free 50K Evaluation",pts:15000,desc:"Any partner firm",type:"eval",evalSize:"50K",icon:"\u{1F4CA}",tier:"bronze",cat:"eval"},
  {name:"Free 75K Evaluation",pts:25000,desc:"Any partner firm",type:"eval",evalSize:"75K",icon:"\u{1F525}",tier:"silver",cat:"eval"},
  {name:"Free 100K Evaluation",pts:30000,desc:"Any partner firm",type:"eval",evalSize:"100K",icon:"\u{1F525}",tier:"silver",cat:"eval"},
  {name:"Free 150K Evaluation",pts:35000,desc:"Any partner firm",type:"eval",evalSize:"150K",icon:"\u{1F48E}",tier:"gold",cat:"eval"},
  {name:"Free 200K Evaluation",pts:40000,desc:"Any partner firm",type:"eval",evalSize:"200K",icon:"\u{1F48E}",tier:"gold",cat:"eval"},
  {name:"Free 250K Evaluation",pts:45000,desc:"Any partner firm",type:"eval",evalSize:"250K",icon:"\u{1F451}",tier:"diamond",cat:"eval"},
  {name:"Free 300K Evaluation",pts:50000,desc:"Any partner firm",type:"eval",evalSize:"300K",icon:"\u{1F451}",tier:"diamond",cat:"eval"},
  {name:"Instant Funded 25K",pts:50000,desc:"Skip the eval — funded immediately",type:"eval",evalSize:"25K",icon:"\u26A1",tier:"diamond",cat:"instant"},
  {name:"Instant Funded 50K",pts:70000,desc:"Skip the eval — funded immediately",type:"eval",evalSize:"50K",icon:"\u26A1",tier:"diamond",cat:"instant"},
  {name:"Instant Funded 100K",pts:90000,desc:"Skip the eval — funded immediately",type:"eval",evalSize:"100K",icon:"\u{1F680}",tier:"diamond",cat:"instant"},
  {name:"Instant Funded 150K",pts:110000,desc:"Skip the eval — funded immediately",type:"eval",evalSize:"150K",icon:"\u{1F680}",tier:"diamond",cat:"instant"},
];
const LOYALTY_TIERS = [
  {name:"Bronze",min:0,max:4999,color:"#cd7f32",glow:"0 0 8px rgba(205,127,50,0.4)",icon:"\u{1F949}",bonus:0},
  {name:"Silver",min:5000,max:14999,color:"#c0c0c0",glow:"0 0 8px rgba(192,192,192,0.4)",icon:"\u{1F948}",bonus:500},
  {name:"Gold",min:15000,max:34999,color:"#fbbf24",glow:"0 0 12px rgba(251,191,36,0.5),0 0 24px rgba(251,191,36,0.2)",icon:"\u{1F947}",bonus:1500},
  {name:"Platinum",min:35000,max:59999,color:"#e5e4e2",glow:"0 0 10px rgba(229,228,226,0.5),0 0 20px rgba(229,228,226,0.2)",icon:"\u{2B50}",bonus:3000},
  {name:"Diamond",min:60000,max:99999,color:"#67e8f9",glow:"0 0 12px rgba(103,232,249,0.5),0 0 28px rgba(103,232,249,0.2)",icon:"\u{1F48E}",bonus:5000},
  {name:"Master",min:100000,max:174999,color:"#a78bfa",glow:"0 0 12px rgba(167,139,250,0.5),0 0 28px rgba(167,139,250,0.2)",icon:"\u{1F3C6}",bonus:8000},
  {name:"Grandmaster",min:175000,max:299999,color:"#f472b6",glow:"0 0 12px rgba(244,114,182,0.5),0 0 28px rgba(244,114,182,0.2)",icon:"\u{1F525}",bonus:12000},
  {name:"Legend",min:300000,max:499999,color:"#fb923c",glow:"0 0 14px rgba(251,146,60,0.6),0 0 32px rgba(251,146,60,0.25)",icon:"\u{26A1}",bonus:20000},
  {name:"Mythic",min:500000,max:999999,color:"#f43f5e",glow:"0 0 16px rgba(244,63,94,0.6),0 0 36px rgba(244,63,94,0.25)",icon:"\u{1F480}",bonus:35000},
  {name:"Immortal",min:1000000,max:Infinity,color:"#fef08a",glow:"0 0 20px rgba(254,240,138,0.7),0 0 40px rgba(254,240,138,0.3),0 0 80px rgba(254,240,138,0.1)",icon:"\u{1F451}",bonus:75000},
];
const getLoyaltyTier = (totalEarned) => LOYALTY_TIERS.find(t=>totalEarned>=t.min&&totalEarned<=t.max)||LOYALTY_TIERS[0];
const getNextTier = (totalEarned) => LOYALTY_TIERS.find(t=>totalEarned<t.min)||null;
const BONUS_TASKS = [
  {key:"follow_x",label:"Follow us on X",pts:150,icon:"\u{1D54F}",url:"https://x.com/PropPulseMedia",color:"#1d9bf0"},
  {key:"sub_youtube",label:"Subscribe on YouTube",pts:150,icon:"\u25B6",url:"https://www.youtube.com/@ThePropPulse",color:"#ff0000"},
  {key:"join_discord",label:"Join our Discord",pts:100,icon:"\u{1F4AC}",url:"https://discord.gg/pP9vfJ7WqK",color:"#5865f2"},
];

// ── PULSE POINTS TAB (full admin panel) ──
const PulsePointsTab = ({user,onLogin,ppSection,setPpSection}) => {
  const [profile,setProfile]=useState(null);
  const [subs,setSubs]=useState([]);
  const [history,setHistory]=useState([]);
  const [rewards,setRewards]=useState([]);
  const [ppTab,setPpTab]=useState("submit");
  const [firm,setFirm]=useState("");
  const [accSize,setAccSize]=useState("");
  const [notes,setNotes]=useState("");
  const [screenshot,setScreenshot]=useState("");
  const [submitting,setSubmitting]=useState(false);
  const [submitMsg,setSubmitMsg]=useState("");
  const [adminSubs,setAdminSubs]=useState([]);
  const [clicks,setClicks]=useState([]);
  const [claimModal,setClaimModal]=useState(null);
  const [claimForm,setClaimForm]=useState({});
  const [claimSubmitting,setClaimSubmitting]=useState(false);
  const [adminRewards,setAdminRewards]=useState([]);
  const [adminTab,setAdminTab]=useState("submissions");
  const [rewardFilter,setRewardFilter]=useState("pending");
  const [adminNoteId,setAdminNoteId]=useState(null);
  const [adminNote,setAdminNote]=useState("");
  const [rewardCat,setRewardCat]=useState("eval");
  const [completedTasks,setCompletedTasks]=useState([]);
  const [adminBonusTasks,setAdminBonusTasks]=useState([]);
  const [discordUser,setDiscordUser]=useState("");
  const [discordStatus,setDiscordStatus]=useState(null);

  const loadData = useCallback(async ()=>{
    if(!user) return;
    const {data:p}=await supabase.from("profiles").select("*").eq("id",user.id).single();
    setProfile(p);
    if(p?.discord_username) setDiscordUser(p.discord_username);
    const {data:s}=await supabase.from("submissions").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
    setSubs(s||[]);
    const {data:h}=await supabase.from("points_history").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
    setHistory(h||[]);
    const {data:r}=await supabase.from("rewards").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
    setRewards(r||[]);
    const {data:c}=await supabase.from("click_tracking").select("*").eq("user_id",user.id).order("clicked_at",{ascending:false}).limit(50);
    setClicks(c||[]);
    const {data:bt}=await supabase.from("bonus_tasks").select("*").eq("user_id",user.id);
    setCompletedTasks((bt||[]).filter(t=>t.status==="approved"||t.status==="pending").map(t=>({key:t.task_key,status:t.status})));
    if(p&&p.is_admin){
      const {data:as}=await supabase.from("submissions").select("*").order("created_at",{ascending:false});
      setAdminSubs(as||[]);
      const {data:ar}=await supabase.from("rewards").select("*").order("created_at",{ascending:false});
      setAdminRewards(ar||[]);
      const {data:abt}=await supabase.from("bonus_tasks").select("*").order("completed_at",{ascending:false});
      setAdminBonusTasks(abt||[]);
    }
  },[user]);

  useEffect(()=>{loadData()},[loadData]);

  useEffect(()=>{
    if(!ppSection) return;
    if(ppSection==="discord"){
      setTimeout(()=>{document.getElementById("discord-role-claim")?.scrollIntoView({behavior:"smooth",block:"center"})},400);
    } else {
      setPpTab(ppSection);
    }
    setPpSection(null);
  },[ppSection,setPpSection]);

  const handleSubmit = async () => {
    if(!firm||!accSize){setSubmitMsg("Select a firm and account size");return;}
    if(!screenshot){setSubmitMsg("Screenshot required — upload proof of purchase to submit");return;}
    setSubmitting(true);setSubmitMsg("");
    const pts=POINT_VALUES[accSize]||100;
    const hasClick=clicks.some(c=>c.firm===firm);
    const {error}=await supabase.from("submissions").insert({user_id:user.id,firm,account_size:accSize,notes:(hasClick?"[CLICK VERIFIED] ":"")+(screenshot?"[HAS SCREENSHOT] ":"")+notes,points_awarded:pts,screenshot_url:screenshot||null});
    if(error){setSubmitMsg("Error: "+error.message);}
    else{setSubmitMsg("Submitted! "+(hasClick?"Click verified — faster approval!":"We'll review and credit your points shortly."));setFirm("");setAccSize("");setNotes("");setScreenshot("");}
    setSubmitting(false);loadData();
  };

  const handleApprove = async (sub) => {
    await supabase.from("submissions").update({status:"approved",reviewed_by:user.id,reviewed_at:new Date().toISOString()}).eq("id",sub.id);
    await supabase.from("points_history").insert({user_id:sub.user_id,amount:sub.points_awarded,reason:"Purchase: "+sub.firm+" "+sub.account_size,submission_id:sub.id});
    const {data:p}=await supabase.from("profiles").select("points,total_earned").eq("id",sub.user_id).single();
    if(p) await supabase.from("profiles").update({points:(p.points||0)+sub.points_awarded,total_earned:(p.total_earned||0)+sub.points_awarded}).eq("id",sub.user_id);
    loadData();
  };

  const handleReject = async (sub) => {
    await supabase.from("submissions").update({status:"rejected",reviewed_by:user.id,reviewed_at:new Date().toISOString()}).eq("id",sub.id);
    loadData();
  };

  const claimReward = (reward) => {
    if(!profile||profile.points<reward.pts) return;
    setClaimForm({});
    setClaimModal(reward);
  };

  const submitClaim = async () => {
    if(!claimModal||!profile) return;
    const r=claimModal;
    if(r.type==="eval"&&!claimForm.firm) return;
    setClaimSubmitting(true);
    const details=JSON.stringify({...claimForm,type:r.type,evalSize:r.evalSize||null,cat:r.cat||"eval"});
    const {error}=await supabase.from("rewards").insert({user_id:user.id,reward_name:r.name,points_cost:r.pts,fulfillment_details:details,user_email:user.email,status:"pending"});
    if(error){alert("Failed to claim: "+error.message);setClaimSubmitting(false);setClaimModal(null);return;}
    await supabase.from("points_history").insert({user_id:user.id,amount:-r.pts,reason:"Reward: "+r.name});
    await supabase.from("profiles").update({points:profile.points-r.pts,rewards_claimed:(profile.rewards_claimed||0)+1}).eq("id",user.id);
    setClaimSubmitting(false);setClaimModal(null);setClaimForm({});loadData();
  };

  const handleRewardStatus = async (rw,newStatus) => {
    const updates={status:newStatus};
    if(newStatus==="fulfilled"){updates.fulfilled_by=user.id;updates.fulfilled_at=new Date().toISOString();}
    if(adminNote&&adminNoteId===rw.id) updates.admin_notes=adminNote;
    const {error}=await supabase.from("rewards").update(updates).eq("id",rw.id);
    if(error){console.error("Reward update error:",error);alert("Update failed: "+error.message);return;}
    setAdminNoteId(null);setAdminNote("");loadData();
  };

  const saveAdminNote = async (rw) => {
    const {error}=await supabase.from("rewards").update({admin_notes:adminNote}).eq("id",rw.id);
    if(error){console.error("Note save error:",error);alert("Save failed: "+error.message);return;}
    setAdminNoteId(null);setAdminNote("");loadData();
  };

  const [taskScreenshot,setTaskScreenshot]=useState("");
  const [taskSubmitting,setTaskSubmitting]=useState("");
  const [taskMsg,setTaskMsg]=useState("");

  const claimTask = async (task) => {
    if(completedTasks.some(t=>t.key===task.key)) return;
    if(task.url) window.open(task.url,"_blank");
  };

  const submitTaskProof = async (task) => {
    if(!taskScreenshot){setTaskMsg("Upload a screenshot first");return;}
    setTaskSubmitting(task.key);setTaskMsg("");
    const {error}=await supabase.from("bonus_tasks").insert({user_id:user.id,task_key:task.key,points_awarded:task.pts,status:"pending",screenshot_url:taskScreenshot});
    if(error){setTaskMsg("Error: "+error.message);setTaskSubmitting("");return;}
    setTaskMsg("Submitted! We'll review and credit your points.");
    setTaskScreenshot("");setTaskSubmitting("");loadData();
  };

  const handleApproveTask = async (bt) => {
    await supabase.from("bonus_tasks").update({status:"approved"}).eq("id",bt.id);
    await supabase.from("points_history").insert({user_id:bt.user_id,amount:bt.points_awarded,reason:"Bonus: "+bt.task_key});
    const {data:p}=await supabase.from("profiles").select("points,total_earned").eq("id",bt.user_id).single();
    if(p) await supabase.from("profiles").update({points:(p.points||0)+bt.points_awarded,total_earned:(p.total_earned||0)+bt.points_awarded}).eq("id",bt.user_id);
    loadData();
  };

  const handleRejectTask = async (bt) => {
    await supabase.from("bonus_tasks").update({status:"rejected"}).eq("id",bt.id);
    loadData();
  };

  if(!user) return (<div className="pp-login-prompt">
    <div style={{fontSize:48,marginBottom:12}}>{'\u2B50'}</div>
    <h3>Earn <span style={{color:'var(--gold)',textShadow:'var(--glow-gold-sm)'}}>Pulse Points</span></h3>
    <p>Buy any evaluation with code PULSE, submit proof, and earn points toward free funded accounts.</p>
    <button className="auth-btn" style={{maxWidth:200,margin:'0 auto'}} onClick={onLogin}>Sign In / Sign Up</button>
    <div style={{marginTop:24}}>
      <div className="pp-card"><h3>How It Works</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:10}}>
          <div style={{textAlign:'center',padding:12}}><div style={{fontSize:24,marginBottom:6}}>1{'\uFE0F'}{'\u20E3'}</div><div style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Buy with code PULSE</div><div style={{fontSize:11,color:'var(--t4)',marginTop:4}}>At any partner firm</div></div>
          <div style={{textAlign:'center',padding:12}}><div style={{fontSize:24,marginBottom:6}}>2{'\uFE0F'}{'\u20E3'}</div><div style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Upload Proof</div><div style={{fontSize:11,color:'var(--t4)',marginTop:4}}>Screenshot of purchase</div></div>
          <div style={{textAlign:'center',padding:12}}><div style={{fontSize:24,marginBottom:6}}>3{'\uFE0F'}{'\u20E3'}</div><div style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Earn Points</div><div style={{fontSize:11,color:'var(--t4)',marginTop:4}}>50-350 pts per purchase</div></div>
          <div style={{textAlign:'center',padding:12}}><div style={{fontSize:24,marginBottom:6}}>{'\u{1F3C6}'}</div><div style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Unlock Rewards</div><div style={{fontSize:11,color:'var(--t4)',marginTop:4}}>Free accounts & more</div></div>
        </div>
      </div>
      <div style={{marginTop:16}}>
        <div style={{fontSize:13,fontWeight:700,color:'var(--em)',textAlign:'center',marginBottom:12,textShadow:'var(--glow-sm)'}}>Reward Tiers</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(200px,100%),1fr))',gap:8}}>
          {REWARD_TIERS.map((r,i)=><div key={i} style={{background:'var(--glass)',border:'1px solid var(--bdr2)',borderRadius:10,padding:'14px 16px',textAlign:'center'}}>
            <div style={{fontSize:20,marginBottom:4}}>{r.icon}</div>
            <div style={{fontSize:12,fontWeight:700,color:'var(--t2)'}}>{r.name}</div>
            <div style={{fontFamily:'var(--mono)',fontSize:16,fontWeight:800,color:'var(--gold)',textShadow:'var(--glow-gold-sm)',marginTop:4}}>{r.pts.toLocaleString()}</div>
            <div style={{fontSize:10,color:'var(--t4)'}}>points</div>
          </div>)}
        </div>
      </div>
    </div>
  </div>);

  const tier=getLoyaltyTier(profile?.total_earned||0);
  const nextTier=getNextTier(profile?.total_earned||0);
  const tierProg=nextTier?((profile?.total_earned||0)-tier.min)/(nextTier.min-tier.min)*100:100;

  return (<div className="pp">
    {/* ── BALANCE + TIER HEADER ── */}
    <div className="pp-hdr-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
      {/* Balance Card */}
      <div style={{background:'linear-gradient(135deg,rgba(6,182,212,0.08),rgba(251,191,36,0.06))',border:'1px solid rgba(251,191,36,0.15)',borderRadius:16,padding:'24px 20px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,var(--em),var(--gold),var(--em))',boxShadow:'0 0 20px rgba(251,191,36,0.4)'}}/>
        <div style={{position:'absolute',top:'50%',right:'-30px',transform:'translateY(-50%)',fontSize:100,opacity:0.04,fontWeight:900}}>{'\u2B50'}</div>
        <div style={{fontSize:11,fontWeight:700,color:'var(--em)',textTransform:'uppercase',letterSpacing:1,marginBottom:8,textShadow:'var(--glow-sm)'}}>Your Points Balance</div>
        <div style={{fontFamily:'var(--mono)',fontSize:42,fontWeight:900,color:'var(--gold)',textShadow:'0 0 8px rgba(251,191,36,0.6),0 0 24px rgba(251,191,36,0.3),0 0 48px rgba(251,191,36,0.15)',lineHeight:1,marginBottom:8,animation:'pulsGlow 3s ease-in-out infinite'}}>{(profile?.points||0).toLocaleString()}</div>
        <div style={{display:'flex',gap:20,fontSize:11,color:'var(--t4)'}}>
          <span>Earned: <b style={{color:'var(--gold)'}}>{(profile?.total_earned||0).toLocaleString()}</b></span>
          <span>Claimed: <b style={{color:'var(--em)'}}>{profile?.rewards_claimed||0}</b></span>
        </div>
      </div>

      {/* Tier Card */}
      <div style={{background:'var(--glass)',border:'1px solid '+tier.color+'30',borderRadius:16,padding:'24px 20px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:tier.color,boxShadow:tier.glow}}/>
        <div style={{position:'absolute',top:'50%',right:'-20px',transform:'translateY(-50%)',fontSize:80,opacity:0.06}}>{tier.icon}</div>
        <div style={{fontSize:11,fontWeight:700,color:tier.color,textTransform:'uppercase',letterSpacing:1,marginBottom:6}}>Loyalty Tier</div>
        <div style={{fontSize:28,fontWeight:900,color:tier.color,textShadow:tier.glow,display:'flex',alignItems:'center',gap:8,marginBottom:10}}>{tier.icon} {tier.name}</div>
        {nextTier?<>
          <div style={{height:6,background:'var(--bg4)',borderRadius:3,overflow:'hidden',marginBottom:6}}>
            <div style={{height:'100%',background:'linear-gradient(90deg,'+tier.color+','+nextTier.color+'80)',borderRadius:3,width:tierProg+'%',transition:'width .8s ease',boxShadow:'0 0 8px '+tier.color+'80'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'var(--t4)'}}>
            <span>{((profile?.total_earned||0)-tier.min).toLocaleString()} / {(nextTier.min-tier.min).toLocaleString()}</span>
            <span style={{color:nextTier.color}}>{nextTier.icon} {nextTier.name}</span>
          </div>
        </>:<div style={{fontSize:11,color:tier.color,fontWeight:600}}>Max tier reached!</div>}
      </div>
    </div>

    {/* Discord Role Claim */}
    <div id="discord-role-claim" style={{marginTop:16,background:'var(--glass)',border:'1px solid rgba(251,191,36,0.15)',borderRadius:14,padding:'20px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,#fbbf24,#f59e0b,#d97706)',boxShadow:'0 0 12px rgba(251,191,36,0.4)'}}/>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
        <span style={{fontSize:18}}>👑</span>
        <span style={{fontSize:14,fontWeight:700,color:'var(--gold)',textShadow:'0 0 10px rgba(251,191,36,0.5), 0 0 20px rgba(251,191,36,0.2)'}}>Claim Your Discord Role</span>
      </div>
      <p style={{fontSize:12,color:'var(--t4)',marginBottom:12,lineHeight:1.6}}>
        Your tier: <span style={{color:tier.color,fontWeight:700,textShadow:tier.glow}}>{tier.icon} {tier.name}</span> — claim the matching role in our Discord server to flex your rank!
      </p>
      {discordStatus==="success"?
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'12px 16px',background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:8}}>
          <span style={{color:'var(--green)',fontWeight:700,fontSize:13}}>✓ Role claimed!</span>
          <span style={{fontSize:12,color:'var(--t4)'}}>Discord: {profile?.discord_username}</span>
          <span style={{fontSize:12,fontWeight:700,color:tier.color,textShadow:tier.glow}}>{tier.name}</span>
        </div>
      :discordStatus==="error"?
        <div style={{padding:'10px 14px',background:'rgba(255,71,87,0.1)',border:'1px solid rgba(255,71,87,0.2)',borderRadius:8,fontSize:12,color:'var(--red)',marginBottom:10}}>
          Could not assign role. Make sure you've joined the ThePropPulse Discord server first and your username is correct.
        </div>
      :null}
      {discordStatus!=="success"&&<div style={{display:'flex',gap:8,alignItems:'center'}}>
        <input style={{flex:1,background:'var(--bg3)',border:'1px solid var(--bdr2)',borderRadius:8,padding:'11px 14px',color:'var(--t1)',fontFamily:'var(--sans)',fontSize:13,outline:'none'}} placeholder="Your Discord username (e.g. joey123)" value={discordUser} onChange={e=>setDiscordUser(e.target.value)}/>
        <button style={{background:'linear-gradient(135deg,#fbbf24,#d97706)',color:'#000',fontFamily:'var(--sans)',fontSize:13,fontWeight:700,padding:'11px 20px',border:'none',borderRadius:8,cursor:'pointer',boxShadow:'0 0 8px rgba(251,191,36,0.3)',transition:'all .2s',whiteSpace:'nowrap'}} disabled={!discordUser.trim()||discordStatus==="claiming"} onClick={async()=>{
          if(!discordUser.trim())return;
          setDiscordStatus("claiming");
          try{
            await supabase.from("profiles").update({discord_username:discordUser.trim()}).eq("id",user.id);
            const res=await fetch("https://fabulous-enjoyment-production-4f2b.up.railway.app/claim-role",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({discord_username:discordUser.trim(),tier:tier.name,user_id:user.id})});
            if(res.ok){setDiscordStatus("success");loadData();}
            else{setDiscordStatus("error");}
          }catch(e){
            await supabase.from("profiles").update({discord_username:discordUser.trim()}).eq("id",user.id);
            setDiscordStatus("success");loadData();
          }
        }}>{discordStatus==="claiming"?"Claiming...":"Claim Role"}</button>
      </div>}
      {discordStatus!=="success"&&<div style={{fontSize:10,color:'var(--t5)',marginTop:8}}>Must be a member of the <a href="https://discord.gg/pP9vfJ7WqK" target="_blank" rel="noopener" style={{color:'var(--gold)',textDecoration:'underline'}}>ThePropPulse Discord</a> first</div>}
    </div>

    {/* Per-Firm Points Breakdown */}
    {subs.filter(s=>s.status==="approved").length>0&&<div style={{marginTop:20}}>
      <div style={{fontSize:13,fontWeight:700,color:'var(--em2)',marginBottom:10,display:'flex',alignItems:'center',gap:6,textShadow:'0 0 8px rgba(6,182,212,0.15)'}}>
        <span style={{fontSize:16}}>📊</span> Points by Firm
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:8}}>
        {(()=>{
          const firmMap={};
          subs.filter(s=>s.status==="approved").forEach(s=>{
            if(!firmMap[s.firm])firmMap[s.firm]={pts:0,count:0};
            firmMap[s.firm].pts+=(s.points_awarded||0);
            firmMap[s.firm].count++;
          });
          return Object.entries(firmMap).sort((a,b)=>b[1].pts-a[1].pts).map(([name,data])=>{
            const f=FIRMS.find(ff=>ff.name===name);
            const fc=f?f.color:'var(--em)';
            return (<div key={name} style={{
              background:'var(--glass)',
              border:'1px solid '+fc+'25',
              borderRadius:12,
              padding:'14px 16px',
              position:'relative',
              overflow:'hidden',
              transition:'all .25s',
              cursor:'default',
              borderTop:'2px solid '+fc,
              boxShadow:'0 0 8px '+fc+'15, 0 0 20px '+fc+'08'
            }}
            onMouseOver={e=>{e.currentTarget.style.boxShadow='0 0 12px '+fc+'40, 0 0 30px '+fc+'20, 0 0 60px '+fc+'10';e.currentTarget.style.transform='translateY(-3px)'}}
            onMouseOut={e=>{e.currentTarget.style.boxShadow='0 0 8px '+fc+'15, 0 0 20px '+fc+'08';e.currentTarget.style.transform='translateY(0)'}}
            >
              <div style={{position:'absolute',top:'-10px',right:'-10px',fontSize:50,opacity:0.04,fontWeight:900}}>{f?.initials||'?'}</div>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:8}}>
                {f&&<FirmLogo f={f} size={22}/>}
                <span style={{fontSize:12,fontWeight:700,color:fc,textShadow:'0 0 6px '+fc+'40'}}>{name}</span>
              </div>
              <div style={{fontFamily:'var(--mono)',fontSize:20,fontWeight:900,color:'var(--gold)',textShadow:'var(--glow-gold-sm)',lineHeight:1}}>{data.pts.toLocaleString()}</div>
              <div style={{fontSize:10,color:'var(--t4)',marginTop:4}}>{data.count} purchase{data.count!==1?'s':''} verified</div>
            </div>);
          });
        })()}
      </div>
    </div>}

    <div className="pp-tabs">
      <button className={`pp-tab ${ppTab==="submit"?"on":""}`} onClick={()=>setPpTab("submit")}>Submit Purchase</button>
      <button className={`pp-tab ${ppTab==="earn"?"on":""}`} onClick={()=>setPpTab("earn")}>Earn More</button>
      <button className={`pp-tab ${ppTab==="history"?"on":""}`} onClick={()=>setPpTab("history")}>History</button>
      <button className={`pp-tab ${ppTab==="rewards"?"on":""}`} onClick={()=>setPpTab("rewards")}>Rewards</button>
      {profile?.is_admin&&<button className={`pp-tab ${ppTab==="admin"?"on":""}`} onClick={()=>setPpTab("admin")} style={{borderColor:'rgba(255,71,87,0.3)',color:ppTab==="admin"?'var(--red)':'var(--t4)'}}>Admin</button>}
    </div>

    {ppTab==="submit"&&<div className="pp-card">
      <h3>Submit a Purchase</h3>
      <p style={{fontSize:12,color:'var(--t4)',marginBottom:12}}>Bought an evaluation with code PULSE? Submit it here to earn points.</p>
      <div className="pp-form">
        <label>Firm</label>
        <select value={firm} onChange={e=>setFirm(e.target.value)}>
          <option value="">Select firm...</option>
          {FIRMS.map(f=><option key={f.name} value={f.name}>{f.name}</option>)}
        </select>
        {firm&&<div style={{fontSize:11,marginTop:4,padding:'6px 10px',borderRadius:6,background:clicks.some(c=>c.firm===firm)?'rgba(16,185,129,0.1)':'rgba(255,190,11,0.08)',border:'1px solid '+(clicks.some(c=>c.firm===firm)?'rgba(16,185,129,0.2)':'rgba(255,190,11,0.15)'),color:clicks.some(c=>c.firm===firm)?'var(--green)':'var(--gold)'}}>
          {clicks.some(c=>c.firm===firm)?'\u2705 Click verified — you visited '+firm+' through our link '+(() => {const c=clicks.find(cc=>cc.firm===firm);return c?new Date(c.clicked_at).toLocaleDateString():''})():'\u26A0\uFE0F No click tracked for this firm yet. Visit the firm through our site first for faster verification.'}
        </div>}
        <label>Account Size</label>
        <select value={accSize} onChange={e=>setAccSize(e.target.value)}>
          <option value="">Select size...</option>
          {Object.keys(POINT_VALUES).map(s=><option key={s} value={s}>{s} ({POINT_VALUES[s]} pts)</option>)}
        </select>
        <label>Proof of Purchase <span style={{color:'var(--red)'}}>*</span> (order confirmation or email screenshot)</label>
        <input type="file" accept="image/*" onChange={async e=>{
          const file=e.target.files?.[0];
          if(!file)return;
          setSubmitMsg("Uploading...");
          const ext=file.name.split('.').pop();
          const path=user.id+'/'+Date.now()+'.'+ext;
          const {error}=await supabase.storage.from('screenshots').upload(path,file);
          if(error){setSubmitMsg("Upload error: "+error.message);return;}
          const {data:u}=supabase.storage.from('screenshots').getPublicUrl(path);
          setScreenshot(u.publicUrl);
          setSubmitMsg("Screenshot uploaded!");
        }} style={{fontSize:12,color:'var(--t3)',marginBottom:4}}/>
        {screenshot&&<div style={{fontSize:11,color:'var(--green)',marginBottom:4}}>{'\u2705'} Screenshot attached</div>}
        <label>Order # or Notes (optional)</label>
        <input className="auth-input" placeholder="Order confirmation number, email used, etc." value={notes} onChange={e=>setNotes(e.target.value)} style={{marginBottom:0}}/>
        {submitMsg&&!submitMsg.includes("Upload")&&<div style={{fontSize:12,marginTop:8,color:submitMsg.includes("Error")?'var(--red)':'var(--green)'}}>{submitMsg}</div>}
        <button className="pp-submit" onClick={handleSubmit} disabled={submitting||!screenshot}>{submitting?"Submitting...":!screenshot?"Upload Screenshot to Submit":"Submit for Points"}</button>
      </div>
    </div>}

    {ppTab==="submit"&&subs.length>0&&<div className="pp-card" style={{marginTop:12}}>
      <h3>Your Submissions</h3>
      {subs.map(s=><div key={s.id} className="pp-row">
        <div><div style={{fontSize:13,fontWeight:600}}>{s.firm}</div><div style={{fontSize:11,color:'var(--t4)'}}>{s.account_size} · {new Date(s.created_at).toLocaleDateString()}</div></div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <span style={{fontFamily:'var(--mono)',fontSize:12,color:'var(--gold)'}}>+{s.points_awarded}</span>
          <span className={`pp-status ${s.status}`}>{s.status}</span>
        </div>
      </div>)}
    </div>}

    {ppTab==="earn"&&<>
      <div className="pp-card" style={{marginBottom:16}}>
        <h3 style={{display:'flex',alignItems:'center',gap:8}}>{'\u{1F3AF}'} <span style={{background:'linear-gradient(135deg,var(--em2),var(--gold))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Bonus Tasks</span>
          <span style={{marginLeft:'auto',fontFamily:'var(--mono)',fontSize:12,color:completedTasks.length>=BONUS_TASKS.length?'var(--green)':'var(--t4)'}}>{completedTasks.filter(t=>t.status==="approved").length}/{BONUS_TASKS.length}</span>
        </h3>
        <p style={{fontSize:12,color:'var(--t4)',marginBottom:12}}>Complete tasks and upload proof to earn bonus points. We'll review and credit within 48 hours.</p>
        <div style={{height:4,background:'var(--bg4)',borderRadius:2,overflow:'hidden',marginBottom:16}}>
          <div style={{height:'100%',background:'linear-gradient(90deg,var(--em),var(--gold))',borderRadius:2,width:(completedTasks.filter(t=>t.status==="approved").length/BONUS_TASKS.length*100)+'%',transition:'width .5s ease',boxShadow:'0 0 8px rgba(251,191,36,0.4)'}}/>
        </div>
        <div style={{display:'grid',gap:10}}>
          {BONUS_TASKS.map(task=>{
            const ct=completedTasks.find(t=>t.key===task.key);
            const done=ct?.status==="approved";
            const pending=ct?.status==="pending";
            return (<div key={task.key} className="task-card" style={{background:done?'rgba(16,185,129,0.06)':pending?'rgba(251,191,36,0.04)':'var(--bg3)',border:'1px solid '+(done?'rgba(16,185,129,0.2)':pending?'rgba(251,191,36,0.15)':task.color+'20'),borderRadius:12,padding:'16px 18px'}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:done||pending?0:12}}>
                <div style={{width:42,height:42,borderRadius:10,background:task.color+'18',border:'1px solid '+task.color+'30',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0,boxShadow:'0 0 8px '+task.color+'20'}}>{done?'\u2713':task.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,color:done?'var(--green)':pending?'var(--gold)':'var(--t1)'}}>{task.label}</div>
                  <div style={{fontFamily:'var(--mono)',fontSize:12,fontWeight:700,color:done?'var(--green)':pending?'var(--gold)':'var(--t4)',marginTop:2}}>
                    {done?'\u2713 +'+task.pts+' earned':pending?'\u23F3 Pending review — +'+task.pts+' pts':'+'+task.pts+' pts'}
                  </div>
                </div>
                {!done&&!pending&&<button style={{fontSize:11,fontWeight:700,color:task.color,background:task.color+'12',border:'1px solid '+task.color+'25',padding:'6px 14px',borderRadius:6,cursor:'pointer',whiteSpace:'nowrap'}} onClick={()=>claimTask(task)}>Visit {'\u2197'}</button>}
              </div>
              {!done&&!pending&&<div style={{marginTop:12,padding:'12px',background:'var(--bg2)',borderRadius:8,border:'1px solid var(--bdr)'}}>
                <div style={{fontSize:11,fontWeight:600,color:'var(--t3)',marginBottom:6}}>Upload proof (screenshot of following/subscribing/joining)</div>
                <input type="file" accept="image/*" onChange={async e=>{
                  const file=e.target.files?.[0];if(!file)return;
                  setTaskMsg("Uploading...");
                  const ext=file.name.split('.').pop();
                  const path=user.id+'/task_'+task.key+'_'+Date.now()+'.'+ext;
                  const {error}=await supabase.storage.from('screenshots').upload(path,file);
                  if(error){setTaskMsg("Upload error: "+error.message);return;}
                  const {data:u}=supabase.storage.from('screenshots').getPublicUrl(path);
                  setTaskScreenshot(u.publicUrl);setTaskMsg("Screenshot uploaded!");
                }} style={{fontSize:11,color:'var(--t3)',marginBottom:6}}/>
                {taskScreenshot&&<div style={{fontSize:11,color:'var(--green)',marginBottom:6}}>{'\u2705'} Screenshot attached</div>}
                {taskMsg&&<div style={{fontSize:11,color:taskMsg.includes("Error")?'var(--red)':'var(--green)',marginBottom:6}}>{taskMsg}</div>}
                <button style={{background:'linear-gradient(135deg,var(--em),#0891b2)',color:'#050810',fontSize:11,fontWeight:700,padding:'7px 16px',border:'none',borderRadius:6,cursor:'pointer',boxShadow:'var(--glow-sm)'}} onClick={()=>submitTaskProof(task)} disabled={taskSubmitting===task.key||!taskScreenshot}>{taskSubmitting===task.key?"Submitting...":"Submit Proof for +"+task.pts+" pts"}</button>
              </div>}
            </div>);
          })}
        </div>
      </div>

      {/* Tier Roadmap */}
      <div className="pp-card">
        <h3 style={{display:'flex',alignItems:'center',gap:8}}>{'\u{1F3C6}'} <span style={{background:'linear-gradient(135deg,var(--em2),var(--gold))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Loyalty Tier Roadmap</span></h3>
        <p style={{fontSize:12,color:'var(--t4)',marginBottom:14}}>Earn bonus points when you reach each tier!</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(160px,100%),1fr))',gap:6}}>
          {LOYALTY_TIERS.map((t,i)=>{
            const earned=profile?.total_earned||0;
            const reached=earned>=t.min;
            return (<div key={i} className={"tier-card tc-"+t.name.toLowerCase()} style={{background:reached?t.color+'12':'var(--bg3)',border:'1px solid '+(reached?t.color+'40':'var(--bdr)'),borderRadius:10,padding:'12px 14px',textAlign:'center',opacity:reached?1:0.7,boxShadow:reached?'0 0 6px '+t.color+'40,0 0 16px '+t.color+'25,0 0 36px '+t.color+'12':'none'}}>
              <div style={{fontSize:22,filter:reached?'drop-shadow(0 0 6px '+t.color+'60)':'grayscale(0.5) opacity(0.5)'}}>{t.icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:reached?t.color:'var(--t4)',marginTop:4}}>{t.name}</div>
              <div style={{fontFamily:'var(--mono)',fontSize:10,color:'var(--t4)',marginTop:2}}>{t.min.toLocaleString()}+</div>
              {t.bonus>0&&<div style={{fontFamily:'var(--mono)',fontSize:10,fontWeight:700,color:reached?'var(--green)':'var(--gold)',marginTop:3}}>+{t.bonus.toLocaleString()} bonus</div>}
            </div>);
          })}
        </div>
      </div>
    </>}

    {ppTab==="history"&&<div className="pp-card">
      <h3>Points History</h3>
      {history.length===0?<p style={{fontSize:12,color:'var(--t4)'}}>No points yet. Submit a purchase to get started!</p>
      :history.map(h=><div key={h.id} className="pp-row">
        <div style={{fontSize:13,color:'var(--t2)'}}>{h.reason}</div>
        <span style={{fontFamily:'var(--mono)',fontSize:13,fontWeight:700,color:h.amount>0?'var(--gold)':'var(--red)'}}>{h.amount>0?"+":""}{h.amount}</span>
      </div>)}
    </div>}

    {ppTab==="rewards"&&<>
      {/* Earn Points Table */}
      <div className="pp-card" style={{marginBottom:16}}>
        <h3 style={{display:'flex',alignItems:'center',gap:6}}>{'\u{1F4B0}'} <span style={{background:'linear-gradient(135deg,var(--em2),var(--gold))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Points Per Purchase</span></h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(90px,1fr))',gap:6,marginTop:12}}>
          {Object.entries(POINT_VALUES).map(([size,pts])=>(
            <div key={size} style={{background:'var(--bg3)',border:'1px solid var(--bdr)',borderRadius:8,padding:'10px 8px',textAlign:'center'}}>
              <div style={{fontFamily:'var(--mono)',fontSize:14,fontWeight:800,color:'var(--em)',textShadow:'var(--glow-sm)'}}>{size}</div>
              <div style={{fontFamily:'var(--mono)',fontSize:12,fontWeight:700,color:'var(--gold)',marginTop:2}}>+{pts}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,color:'var(--em)',display:'flex',alignItems:'center',gap:6,textShadow:'var(--glow-sm)'}}>{'\u{1F381}'} Unlock Rewards</div>
        <div style={{marginLeft:'auto',display:'flex',gap:4}}>
          <button className={`f-btn ${rewardCat==="eval"?"on":""}`} onClick={()=>setRewardCat("eval")} style={{fontSize:11}}>{'\u{1F4CA}'} Evaluations</button>
          <button className={`f-btn ${rewardCat==="instant"?"on":""}`} onClick={()=>setRewardCat("instant")} style={rewardCat==="instant"?{fontSize:11,background:'rgba(34,211,238,0.15)',borderColor:'rgba(34,211,238,0.3)',color:'var(--em)'}:{fontSize:11}}>{'\u26A1'} Instant Funding</button>
        </div>
      </div>

      {/* Rewards Grid */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(190px,100%),1fr))',gap:10,marginBottom:16}}>
        {REWARD_TIERS.filter(r=>r.cat===rewardCat).map((r,i)=>{
          const pts=profile?.points||0;
          const canClaim=pts>=r.pts;
          const progress=Math.min(100,(pts/r.pts)*100);
          const tierData=LOYALTY_TIERS.find(t=>t.name.toLowerCase()===r.tier)||LOYALTY_TIERS[0];
          const isInstant=r.cat==="instant";
          const accentColor=isInstant?'rgba(34,211,238,':'rgba(251,191,36,';
          return (<div key={i} className={"rw-card"+(isInstant?" instant":"")+(canClaim?"":" locked-"+r.tier)} style={{
            background:canClaim?'linear-gradient(135deg,'+accentColor+'0.1),'+accentColor+'0.04))':'linear-gradient(135deg,'+tierData.color+'08,'+tierData.color+'03)',
            border:'1px solid '+(canClaim?accentColor+'0.35)':tierData.color+'20'),
            borderRadius:14,padding:'20px 16px',textAlign:'center',
            cursor:canClaim?'pointer':'default',
            boxShadow:canClaim?'0 0 4px '+accentColor+'0.3),0 0 16px '+accentColor+'0.15),0 0 40px '+accentColor+'0.06)':'0 0 3px '+tierData.color+'30,0 0 12px '+tierData.color+'15,0 0 30px '+tierData.color+'08',
          }} onClick={()=>canClaim&&claimReward(r)}>
            {/* Top glow bar */}
            <div style={{position:'absolute',top:0,left:0,right:0,height:canClaim?3:1,background:canClaim?'linear-gradient(90deg,transparent,'+(isInstant?'var(--em)':'var(--gold)')+',transparent)':'linear-gradient(90deg,transparent,'+tierData.color+'40,transparent)',boxShadow:canClaim?'0 0 20px '+accentColor+'0.6)':'none'}}/>
            {/* Background glow for claimable */}
            {canClaim&&<div style={{position:'absolute',top:'-40%',left:'50%',transform:'translateX(-50%)',width:250,height:250,background:'radial-gradient(circle,'+accentColor+'0.15) 0%,transparent 55%)',borderRadius:'50%',pointerEvents:'none',animation:'pulsGlow 3s ease-in-out infinite'}}/>}
            {/* Tier badge */}
            <div style={{position:'absolute',top:8,right:8,fontSize:8,fontWeight:700,color:tierData.color,background:tierData.color+'15',border:'1px solid '+tierData.color+'25',padding:'2px 6px',borderRadius:4,textTransform:'uppercase',letterSpacing:.5}}>{tierData.icon} {r.tier}</div>
            {/* Instant badge */}
            {isInstant&&<div style={{position:'absolute',top:8,left:8,fontSize:8,fontWeight:700,color:'var(--em)',background:'rgba(34,211,238,0.12)',border:'1px solid rgba(34,211,238,0.25)',padding:'2px 6px',borderRadius:4,textTransform:'uppercase',letterSpacing:.5}}>{'\u26A1'} INSTANT</div>}
            {/* Icon */}
            <div style={{fontSize:36,marginBottom:6,marginTop:isInstant?8:0,filter:canClaim?'drop-shadow(0 0 8px '+accentColor+'0.4))':'grayscale(0.5) opacity(0.6)'}}>{r.icon}</div>
            {/* Points cost */}
            <div style={{fontFamily:'var(--mono)',fontSize:22,fontWeight:900,color:canClaim?(isInstant?'var(--em)':'var(--gold)'):'var(--t3)',textShadow:canClaim?'0 0 8px '+accentColor+'0.6),0 0 20px '+accentColor+'0.3)':'none',marginBottom:2}}>{r.pts.toLocaleString()}</div>
            <div style={{fontSize:9,color:'var(--t4)',fontWeight:600,textTransform:'uppercase',letterSpacing:.8,marginBottom:8}}>points</div>
            {/* Name */}
            <div style={{fontSize:13,fontWeight:700,color:canClaim?'var(--t1)':'var(--t3)',marginBottom:3}}>{r.name}</div>
            <div style={{fontSize:10,color:'var(--t4)',marginBottom:12,lineHeight:1.4}}>{r.desc}</div>
            {/* Progress bar */}
            <div style={{height:4,background:'var(--bg4)',borderRadius:2,overflow:'hidden',marginBottom:6}}>
              <div style={{height:'100%',background:canClaim?'linear-gradient(90deg,'+(isInstant?'var(--em),#67e8f9':'var(--gold),#fde68a')+')':'linear-gradient(90deg,'+tierData.color+'80,'+tierData.color+'40)',borderRadius:2,width:Math.min(100,progress)+'%',transition:'width .5s ease',boxShadow:canClaim?'0 0 6px '+accentColor+'0.4)':'none'}}/>
            </div>
            <div style={{fontSize:10,color:'var(--t4)',fontFamily:'var(--mono)'}}>
              {canClaim
                ?<span style={{color:isInstant?'var(--em)':'var(--gold)',fontWeight:700,textShadow:isInstant?'var(--glow-sm)':'var(--glow-gold-sm)'}}>{'\u2713'} READY TO CLAIM</span>
                :<span>{(r.pts-pts).toLocaleString()} more needed</span>}
            </div>
            {/* Claim button */}
            {canClaim&&<button style={{marginTop:10,background:isInstant?'linear-gradient(135deg,#22d3ee,#0891b2)':'linear-gradient(135deg,#fbbf24,#f59e0b)',color:'#050810',fontFamily:'var(--sans)',fontSize:12,fontWeight:700,padding:'8px 20px',border:'none',borderRadius:7,cursor:'pointer',boxShadow:'0 0 6px '+accentColor+'0.5),0 0 16px '+accentColor+'0.3),0 0 32px '+accentColor+'0.15)',transition:'all .2s'}} onClick={e=>{e.stopPropagation();claimReward(r)}}>Claim Reward</button>}
            {/* Lock icon */}
            {!canClaim&&<div style={{fontSize:14,color:'var(--t5)',marginTop:6}}>{'\u{1F512}'}</div>}
          </div>);
        })}
      </div>

      {/* Claimed Rewards History */}
      {rewards.length>0&&<div className="pp-card" style={{marginTop:16}}>
        <h3>Your Claimed Rewards</h3>
        {rewards.map(rw=>{
          let det={};try{det=rw.fulfillment_details?JSON.parse(rw.fulfillment_details):{};}catch(e){}
          const statusColors={pending:'var(--gold)',processing:'var(--em)',fulfilled:'var(--green)',rejected:'var(--red)'};
          const statusLabels={pending:'Pending Review',processing:'Being Fulfilled',fulfilled:'Fulfilled \u2713',rejected:'Rejected'};
          return (<div key={rw.id} style={{padding:'14px 0',borderBottom:'1px solid var(--bdr)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:'var(--t1)'}}>{rw.reward_name}</div>
                <div style={{fontSize:11,color:'var(--t4)',marginTop:2}}>
                  {det.type==="eval"&&<>Firm: <b style={{color:'var(--t2)'}}>{det.firm}</b> &middot; </>}
                  {new Date(rw.created_at).toLocaleDateString()}
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--gold)'}}>-{rw.points_cost.toLocaleString()} pts</span>
                <span style={{fontFamily:'var(--mono)',fontSize:10,fontWeight:700,padding:'3px 10px',borderRadius:5,background:(statusColors[rw.status]||'var(--t4)')+'15',color:statusColors[rw.status]||'var(--t4)',border:'1px solid '+(statusColors[rw.status]||'var(--t4)')+'30'}}>{statusLabels[rw.status]||rw.status}</span>
              </div>
            </div>
            {rw.admin_notes&&<div style={{fontSize:11,color:'var(--t3)',marginTop:6,padding:'6px 10px',background:'var(--bg3)',borderRadius:6,borderLeft:'2px solid var(--em)'}}>{'\u{1F4AC}'} {rw.admin_notes}</div>}
          </div>);
        })}
      </div>}
    </>}

    {claimModal&&<div className="auth-overlay" onClick={()=>setClaimModal(null)}><div className="auth-modal" onClick={e=>e.stopPropagation()} style={{maxWidth:440}}>
      <button className="auth-close" onClick={()=>setClaimModal(null)}>{'\u2715'}</button>
      <h2 style={{fontSize:18}}>Claim <span>{claimModal.name}</span></h2>
      <p style={{marginBottom:16}}>This will deduct <b style={{color:'var(--gold)'}}>{claimModal.pts} points</b> from your balance.</p>

      {claimModal.type==="eval"&&<>
        <div style={{fontSize:12,fontWeight:600,color:'var(--t3)',marginBottom:5}}>Which firm do you want your {claimModal.evalSize} {claimModal.cat==="instant"?"instant funded":"evaluation"} account from?</div>
        <select className="pp-form" value={claimForm.firm||""} onChange={e=>setClaimForm(p=>({...p,firm:e.target.value}))} style={{width:'100%',background:'var(--bg3)',border:'1px solid var(--bdr2)',borderRadius:8,padding:'10px 14px',color:'var(--t1)',fontFamily:'var(--sans)',fontSize:13,marginBottom:10}}>
          <option value="">Select firm...</option>
          {FIRMS.map(f=><option key={f.name} value={f.name}>{f.name}</option>)}
        </select>
        <div style={{fontSize:12,fontWeight:600,color:'var(--t3)',marginBottom:5}}>Email for this firm (we'll send the account here)</div>
        <input className="auth-input" placeholder={user?.email||"your@email.com"} value={claimForm.email||""} onChange={e=>setClaimForm(p=>({...p,email:e.target.value}))}/>
        <div style={{fontSize:10,color:'var(--t4)',marginTop:2}}>Leave blank to use your account email ({user?.email})</div>
      </>}

      <div style={{fontSize:11,color:'var(--t4)',margin:'10px 0',padding:'8px 12px',background:'var(--bg3)',borderRadius:6,lineHeight:1.6}}>
        {'\u2139\uFE0F'} After claiming, we'll process your reward within <b style={{color:'var(--em)'}}>48 hours</b>. You'll see status updates here and we'll contact you at <b style={{color:'var(--t2)'}}>{user?.email}</b> when it's ready.
      </div>

      <button className="auth-btn" onClick={submitClaim} disabled={claimSubmitting||!claimForm.firm}>
        {claimSubmitting?"Processing...":"Confirm — Spend "+claimModal.pts.toLocaleString()+" Points"}
      </button>
    </div></div>}

    {ppTab==="admin"&&profile?.is_admin&&<>
      <div style={{display:'flex',gap:4,marginBottom:16}}>
        <button className={`f-btn ${adminTab==="submissions"?"on":""}`} onClick={()=>setAdminTab("submissions")}>Purchase Submissions ({adminSubs.filter(s=>s.status==="pending").length} pending)</button>
        <button className={`f-btn ${adminTab==="rewards"?"on":""}`} style={adminTab==="rewards"?{borderColor:'rgba(251,191,36,0.3)',background:'rgba(251,191,36,0.1)',color:'var(--gold)'}:{}} onClick={()=>setAdminTab("rewards")}>{'\u{1F381}'} Reward Claims ({adminRewards.filter(r=>r.status==="pending").length} pending)</button>
        <button className={`f-btn ${adminTab==="tasks"?"on":""}`} onClick={()=>setAdminTab("tasks")}>{'\u{1F3AF}'} Bonus Tasks ({adminBonusTasks.filter(t=>t.status==="pending").length} pending)</button>
      </div>

      {adminTab==="submissions"&&<div className="pp-card">
        <h3 style={{color:'var(--red)'}}>Purchase Submissions</h3>
        {adminSubs.filter(s=>s.status==="pending").length===0&&<p style={{fontSize:12,color:'var(--t4)'}}>No pending submissions.</p>}
        {adminSubs.map(s=><div key={s.id} className="pp-row" style={{flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:200}}>
            <div style={{fontSize:13,fontWeight:600,display:'flex',alignItems:'center',gap:6}}>
              {s.firm} · {s.account_size}
              {s.notes?.includes("[CLICK VERIFIED]")&&<span style={{fontSize:9,background:'rgba(16,185,129,0.15)',color:'var(--green)',padding:'2px 6px',borderRadius:4,fontWeight:700}}>CLICK VERIFIED</span>}
              {s.notes?.includes("[HAS SCREENSHOT]")&&<span style={{fontSize:9,background:'rgba(6,182,212,0.15)',color:'var(--em)',padding:'2px 6px',borderRadius:4,fontWeight:700}}>HAS PROOF</span>}
            </div>
            <div style={{fontSize:11,color:'var(--t4)'}}>{s.user_id.slice(0,8)}... · {new Date(s.created_at).toLocaleDateString()}{s.notes&&" · "+s.notes.replace("[CLICK VERIFIED] ","").replace("[HAS SCREENSHOT] ","")}</div>
            {s.screenshot_url&&<a href={s.screenshot_url} target="_blank" rel="noopener" style={{fontSize:11,color:'var(--em)',display:'inline-block',marginTop:4}}>View Screenshot {'\u2192'}</a>}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <span className={`pp-status ${s.status}`}>{s.status}</span>
            <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--gold)'}}>+{s.points_awarded}</span>
            {s.status==="pending"&&<>
              <button style={{background:'rgba(16,185,129,0.15)',border:'1px solid rgba(16,185,129,0.3)',color:'var(--green)',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:5,cursor:'pointer'}} onClick={()=>handleApprove(s)}>Approve</button>
              <button style={{background:'rgba(255,71,87,0.15)',border:'1px solid rgba(255,71,87,0.3)',color:'var(--red)',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:5,cursor:'pointer'}} onClick={()=>handleReject(s)}>Reject</button>
            </>}
          </div>
        </div>)}
      </div>}

      {adminTab==="rewards"&&<>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
          {[["pending","Pending","\u{1F7E1}"],["processing","Processing","\u{1F535}"],["fulfilled","Fulfilled","\u2705"],["all","All","\u{1F4CB}"]].map(([k,l,icon])=>{
            const cnt=k==="all"?adminRewards.length:adminRewards.filter(r=>r.status===k).length;
            return (<div key={k} onClick={()=>setRewardFilter(k)} style={{background:rewardFilter===k?'var(--emA2)':'var(--glass)',border:'1px solid '+(rewardFilter===k?'var(--bdr3)':'var(--bdr)'),borderRadius:10,padding:'12px 14px',cursor:'pointer',textAlign:'center',transition:'all .15s'}}>
              <div style={{fontSize:16}}>{icon}</div>
              <div style={{fontFamily:'var(--mono)',fontSize:20,fontWeight:800,color:rewardFilter===k?'var(--em)':'var(--t1)',marginTop:4}}>{cnt}</div>
              <div style={{fontSize:10,color:'var(--t4)',fontWeight:600,textTransform:'uppercase',letterSpacing:.5}}>{l}</div>
            </div>);
          })}
        </div>

        <div className="pp-card">
          <h3 style={{color:'var(--gold)',display:'flex',alignItems:'center',gap:8}}>{'\u{1F381}'} Reward Fulfillment Queue</h3>
          {(rewardFilter==="all"?adminRewards:adminRewards.filter(r=>r.status===rewardFilter)).length===0&&<p style={{fontSize:12,color:'var(--t4)',padding:12}}>No {rewardFilter==="all"?"":rewardFilter} rewards.</p>}
          {(rewardFilter==="all"?adminRewards:adminRewards.filter(r=>r.status===rewardFilter)).map(rw=>{
            let det={};try{det=rw.fulfillment_details?JSON.parse(rw.fulfillment_details):{};}catch(e){}
            const statusColors={pending:'var(--gold)',processing:'var(--em)',fulfilled:'var(--green)',rejected:'var(--red)'};
            return (<div key={rw.id} style={{padding:'16px 0',borderBottom:'1px solid var(--bdr)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:8}}>
                <div style={{flex:1,minWidth:220}}>
                  <div style={{fontSize:14,fontWeight:700,color:'var(--t1)',display:'flex',alignItems:'center',gap:6}}>
                    <span>{det.type==="eval"?"\u{1F4CA}":det.type==="merch"?"\u{1F455}":det.type==="call"?"\u{1F4DE}":"\u{1F381}"}</span>
                    {rw.reward_name}
                    <span style={{fontFamily:'var(--mono)',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:4,background:(statusColors[rw.status]||'var(--t4)')+'15',color:statusColors[rw.status]||'var(--t4)',border:'1px solid '+(statusColors[rw.status]||'var(--t4)')+'30',textTransform:'uppercase'}}>{rw.status}</span>
                  </div>
                  <div style={{fontSize:11,color:'var(--t4)',marginTop:4}}>
                    <b style={{color:'var(--t2)'}}>{rw.user_email||rw.user_id.slice(0,12)+"..."}</b> &middot; {new Date(rw.created_at).toLocaleDateString()} {new Date(rw.created_at).toLocaleTimeString()} &middot; <span style={{color:'var(--gold)'}}>{rw.points_cost} pts</span>
                  </div>

                  <div style={{marginTop:8,padding:'10px 12px',background:'var(--bg3)',borderRadius:8,border:'1px solid var(--bdr)'}}>
                    <div style={{fontSize:10,fontWeight:700,color:'var(--em)',textTransform:'uppercase',letterSpacing:.8,marginBottom:6}}>Fulfillment Details</div>
                    {det.type==="eval"&&<>
                      <div style={{fontSize:12,color:'var(--t2)',lineHeight:1.8}}>
                        <b>Firm:</b> {det.firm||"Not specified"}<br/>
                        <b>Account Size:</b> {det.evalSize||"N/A"}<br/>
                        <b>Email:</b> {det.email||rw.user_email||"Use account email"}
                      </div>
                    </>}
                    {det.type==="merch"&&<>
                      <div style={{fontSize:12,color:'var(--t2)',lineHeight:1.8}}>
                        <b>Name:</b> {det.shipName}<br/>
                        <b>Address:</b> {det.address}, {det.city}, {det.state} {det.zip} {det.country||"US"}<br/>
                        <b>Shirt Size:</b> {det.shirtSize||"Not specified"}
                      </div>
                    </>}
                    {det.type==="call"&&<>
                      <div style={{fontSize:12,color:'var(--t2)',lineHeight:1.8}}>
                        <b>Discord:</b> {det.discord}<br/>
                        <b>Timezone:</b> {det.timezone||"Not specified"}<br/>
                        <b>Availability:</b> {det.availability||"Not specified"}<br/>
                        <b>Focus:</b> {det.focus||"General"}
                      </div>
                    </>}
                    {!det.type&&<div style={{fontSize:11,color:'var(--t4)'}}>No fulfillment details (legacy claim)</div>}
                  </div>

                  {rw.admin_notes&&<div style={{fontSize:11,color:'var(--t3)',marginTop:6,padding:'6px 10px',background:'rgba(6,182,212,0.05)',borderRadius:6,borderLeft:'2px solid var(--em)'}}>{'\u{1F4AC}'} {rw.admin_notes}</div>}
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:4,minWidth:130}}>
                  {rw.status==="pending"&&<>
                    <button style={{background:'rgba(6,182,212,0.15)',border:'1px solid rgba(6,182,212,0.3)',color:'var(--em)',fontSize:11,fontWeight:700,padding:'6px 12px',borderRadius:6,cursor:'pointer',width:'100%'}} onClick={()=>handleRewardStatus(rw,"processing")}>Mark Processing</button>
                    <button style={{background:'rgba(255,71,87,0.1)',border:'1px solid rgba(255,71,87,0.2)',color:'var(--red)',fontSize:11,fontWeight:700,padding:'6px 12px',borderRadius:6,cursor:'pointer',width:'100%'}} onClick={()=>handleRewardStatus(rw,"rejected")}>Reject</button>
                  </>}
                  {rw.status==="processing"&&<>
                    <button style={{background:'rgba(16,185,129,0.15)',border:'1px solid rgba(16,185,129,0.3)',color:'var(--green)',fontSize:11,fontWeight:700,padding:'6px 12px',borderRadius:6,cursor:'pointer',width:'100%'}} onClick={()=>handleRewardStatus(rw,"fulfilled")}>{'\u2713'} Mark Fulfilled</button>
                    <button style={{background:'rgba(255,71,87,0.1)',border:'1px solid rgba(255,71,87,0.2)',color:'var(--red)',fontSize:11,fontWeight:700,padding:'6px 12px',borderRadius:6,cursor:'pointer',width:'100%'}} onClick={()=>handleRewardStatus(rw,"rejected")}>Reject</button>
                  </>}
                  {rw.status==="fulfilled"&&<div style={{fontSize:10,color:'var(--green)',textAlign:'center',padding:6}}>{'\u2713'} Fulfilled {rw.fulfilled_at?new Date(rw.fulfilled_at).toLocaleDateString():""}</div>}
                  <button style={{background:'none',border:'1px solid var(--bdr)',color:'var(--t4)',fontSize:10,fontWeight:600,padding:'5px 10px',borderRadius:5,cursor:'pointer',width:'100%'}} onClick={()=>{setAdminNoteId(adminNoteId===rw.id?null:rw.id);setAdminNote(rw.admin_notes||"")}}>{adminNoteId===rw.id?"Cancel":"\u{270F}\uFE0F Add Note"}</button>
                  {adminNoteId===rw.id&&<div style={{display:'flex',gap:4}}>
                    <input style={{flex:1,background:'var(--bg3)',border:'1px solid var(--bdr2)',borderRadius:5,padding:'5px 8px',color:'var(--t1)',fontFamily:'var(--sans)',fontSize:11}} placeholder="Admin note..." value={adminNote} onChange={e=>setAdminNote(e.target.value)}/>
                    <button style={{background:'var(--emA2)',border:'1px solid var(--bdr3)',color:'var(--em)',fontSize:10,fontWeight:700,padding:'5px 8px',borderRadius:5,cursor:'pointer'}} onClick={()=>saveAdminNote(rw)}>Save</button>
                  </div>}
                </div>
              </div>
            </div>);
          })}
        </div>
      </>}

      {adminTab==="tasks"&&<div className="pp-card">
        <h3 style={{color:'var(--em)'}}>{'\u{1F3AF}'} Bonus Task Submissions</h3>
        {adminBonusTasks.filter(t=>t.status==="pending").length===0&&<p style={{fontSize:12,color:'var(--t4)',padding:8}}>No pending task submissions.</p>}
        {adminBonusTasks.filter(t=>t.status==="pending").map(bt=>(
          <div key={bt.id} className="pp-row" style={{flexWrap:'wrap',gap:8}}>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontSize:13,fontWeight:700,color:'var(--t1)'}}>{bt.task_key.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase())}</div>
              <div style={{fontSize:11,color:'var(--t4)'}}>{bt.user_id.slice(0,8)}... · {new Date(bt.completed_at).toLocaleDateString()} · <span style={{color:'var(--gold)'}}>+{bt.points_awarded} pts</span></div>
              {bt.screenshot_url&&<a href={bt.screenshot_url} target="_blank" rel="noopener" style={{fontSize:11,color:'var(--em)',display:'inline-block',marginTop:4}}>View Screenshot {'\u2192'}</a>}
            </div>
            <div style={{display:'flex',gap:4}}>
              <button style={{background:'rgba(16,185,129,0.15)',border:'1px solid rgba(16,185,129,0.3)',color:'var(--green)',fontSize:11,fontWeight:700,padding:'5px 12px',borderRadius:5,cursor:'pointer'}} onClick={()=>handleApproveTask(bt)}>Approve</button>
              <button style={{background:'rgba(255,71,87,0.15)',border:'1px solid rgba(255,71,87,0.3)',color:'var(--red)',fontSize:11,fontWeight:700,padding:'5px 12px',borderRadius:5,cursor:'pointer'}} onClick={()=>handleRejectTask(bt)}>Reject</button>
            </div>
          </div>
        ))}
        {adminBonusTasks.filter(t=>t.status!=="pending").length>0&&<>
          <div style={{fontSize:11,fontWeight:700,color:'var(--t4)',marginTop:16,marginBottom:8,textTransform:'uppercase',letterSpacing:.8}}>History</div>
          {adminBonusTasks.filter(t=>t.status!=="pending").map(bt=>(
            <div key={bt.id} className="pp-row">
              <div><div style={{fontSize:12,fontWeight:600}}>{bt.task_key.replace(/_/g," ")}</div><div style={{fontSize:10,color:'var(--t4)'}}>{bt.user_id.slice(0,8)}... · {new Date(bt.completed_at).toLocaleDateString()}</div></div>
              <span className={`pp-status ${bt.status}`}>{bt.status}</span>
            </div>
          ))}
        </>}
      </div>}
    </>}
  </div>);
};

// ── APP ──────────────────────────────────────────────────────────────────────

// ── COMPARE OVERLAY ──
const CompareOverlay = ({firms,onClose}) => {
  const [cmpSize,setCmpSize]=useState("50K");
  const sizes=["25K","50K","100K","150K"];
  const cols=firms.length;
  const gridCols=`140px repeat(${cols},1fr)`;
  // For each firm, find the best matching challenge at chosen size (prefer standard plan)
  const getCh=(f)=>{
    const matches=CHALLENGES.filter(c=>c.firm===f.name&&c.size===cmpSize);
    return matches.find(c=>c.standard)||matches[0]||null;
  };
  const rows=[
    {label:"Pulse Score",fn:(f)=>({v:String(calcPulse(f.rating,f.reviews,f.name)),n:calcPulse(f.rating,f.reviews,f.name)}),best:"max",fromFirm:true},
    {label:"Rating",fn:(f)=>({v:f.rating+"/5 ("+f.reviews.toLocaleString()+")",n:f.rating}),best:"max",fromFirm:true},
    {label:"Plan",fn:(_,c)=>({v:c?c.plan:"—"}),fromFirm:false},
    {label:"Price",fn:(_,c)=>({v:c?c.price:"—"}),fromFirm:false},
    {label:"Profit Target",fn:(_,c)=>({v:c?c.target:"—"}),fromFirm:false},
    {label:"Max Drawdown",fn:(_,c)=>({v:c?c.maxLoss:"—"}),fromFirm:false},
    {label:"Daily Loss Limit",fn:(_,c)=>({v:c?c.dll:"—"}),fromFirm:false},
    {label:"Drawdown Type",fn:(_,c)=>({v:c?c.drawdown:"—"}),fromFirm:false},
    {label:"Consistency",fn:(_,c)=>({v:c?c.consistency:"—"}),fromFirm:false},
    {label:"Profit Split",fn:(_,c)=>({v:c?c.split:"—"}),fromFirm:false},
    {label:"Min Days",fn:(_,c)=>({v:c?c.minDays:"—"}),fromFirm:false},
    {label:"Payout",fn:(_,c)=>({v:c?c.payout:"—"}),fromFirm:false},
    {label:"News Trading",fn:(_,c)=>({v:c?(c.news?"✓ Yes":"✗ No"):"—"}),fromFirm:false},
    {label:"EAs / Bots",fn:(_,c)=>({v:c?(c.ea?"✓ Yes":"✗ No"):"—"}),fromFirm:false},
    {label:"Payout Speed",fn:(f)=>({v:f.paySpeed}),fromFirm:true},
    {label:"Current Deal",fn:(f)=>{const d=DEALS.find(x=>x.firm===f.name);return {v:d?d.pct+" w/ code "+d.code:"—"}},fromFirm:true},
  ];
  return (<div className="cmp-overlay" onClick={onClose}>
    <div className="cmp-modal" onClick={e=>e.stopPropagation()}>
      <div className="cmp-header">
        <div>
          <h2>Compare <span>{cols} Firms</span></h2>
          <div style={{display:'flex',gap:4,marginTop:8}}>
            {sizes.map(s=><button key={s} className={`f-btn ${cmpSize===s?"on":""}`} style={{padding:'4px 12px',fontSize:11}} onClick={()=>setCmpSize(s)}>{s}</button>)}
          </div>
        </div>
        <button className="cmp-close" onClick={onClose}>✕</button>
      </div>
      <div style={{overflowX:'auto'}}>
      <div className="cmp-grid" style={{minWidth:cols*220+140}}>
        <div className="cmp-row" style={{display:'grid',gridTemplateColumns:gridCols}}>
          <div className="cmp-label" style={{background:'transparent',borderRight:'1px solid var(--bdr)'}}/>
          {firms.map(f=>{const ch=getCh(f);return <div key={f.id} className="cmp-firm-hdr">
            <FirmLogo f={f} size={36}/>
            <div className="cmp-firm-name" style={{color:f.color}}>{f.name}</div>
            <div style={{fontSize:11,color:'var(--t4)',marginTop:2}}>{ch?ch.plan+" "+cmpSize:<span style={{color:'var(--red)',fontSize:10}}>No {cmpSize} plan</span>}</div>
            <div className="cmp-firm-pulse" style={{color:pulseColor(calcPulse(f.rating,f.reviews,f.name)),textShadow:'var(--glow-gold-sm)'}}>{calcPulse(f.rating,f.reviews,f.name)}</div>
            {AFFILIATE_LINKS[f.name]?<button className="cmp-deal-btn" onClick={()=>trackClick(f.name)}>Get Deal</button>:<button className="cmp-deal-btn" style={{background:'var(--emA2)',color:'var(--em)',boxShadow:'none'}} onClick={()=>{const fp=FIRM_PROFILES[f.name];window.open('https://'+(fp?.website||''),'_blank')}}>Visit Site</button>}
          </div>})}
        </div>
        {rows.map((r,ri)=><div key={ri} className="cmp-row" style={{display:'grid',gridTemplateColumns:gridCols}}>
          <div className="cmp-label">{r.label}</div>
          {firms.map(f=>{
            const ch=getCh(f);
            const res=r.fn(f,ch);
            const isGood=res.v&&(res.v.includes("✓")||res.v==="None");
            const isBad=res.v&&res.v.includes("✗");
            return <div key={f.id} className="cmp-cell" style={{...(isGood?{color:'var(--green)',fontWeight:600}:isBad?{color:'var(--red)'}:{})}}>{res.v||"—"}</div>;
          })}
        </div>)}
      </div>
      </div>
    </div>
  </div>);
};


// ── FOOTER ──
const Footer = ({setPage,setTab}) => {
  const go=(t)=>{setPage("home");setTab(t);window.scrollTo({top:0,behavior:"smooth"})};
  return (<footer className="footer">
    <div className="ft-inner">
      <div>
        <div className="ft-brand">The<span>Prop</span>Pulse</div>
        <div className="ft-desc">The #1 futures prop firm comparison platform. Compare firms, save with exclusive deals, and earn rewards on every purchase.</div>
      </div>
      <div className="ft-col">
        <h4>Platform</h4>
        <a href="#" onClick={e=>{e.preventDefault();go("firms")}}>Compare Firms</a>
        <a href="#" onClick={e=>{e.preventDefault();go("challenges")}}>Challenge Finder</a>
        <a href="#" onClick={e=>{e.preventDefault();go("offers")}}>Deals & Offers</a>
        <a href="#" onClick={e=>{e.preventDefault();go("giveaways")}}>Giveaways</a>
      </div>
      <div className="ft-col">
        <h4>Resources</h4>
        <a href="#" onClick={e=>{e.preventDefault();go("blog")}}>Research</a>
        <a href="#" onClick={e=>{e.preventDefault();go("videos")}}>Videos</a>
        <a href="#" onClick={e=>{e.preventDefault();go("points")}}>Pulse Points</a>
      </div>
      <div className="ft-col">
        <h4>Community</h4>
        <a href="https://discord.gg/timeless" target="_blank" rel="noopener">Discord</a>
        <a href="https://www.youtube.com/@ThePropPulse" target="_blank" rel="noopener">YouTube</a>
        <a href="https://x.com/ThePropPulse" target="_blank" rel="noopener">X / Twitter</a>
      </div>
    </div>
    <div className="ft-bottom">© 2026 ThePropPulse. Not financial advice. All trademarks belong to their respective owners.</div>
  </footer>);
};

// ═══════════════════════════════════════════════════════════════════════
// ██████  MAIN APP — Trading Rewards Terminal Layout  ██████
// ═══════════════════════════════════════════════════════════════════════
export default function App() {
  const [page,setPage]=useState("home");
  const [tab,setTab]=useState("firms");
  const [view,setView]=useState("cards");
  const [sort,setSort]=useState("pulse");
  const [sf,setSF]=useState(null);
  const [blogPost,setBlogPost]=useState(null);
  const [user,setUser]=useState(null);
  const [showAuth,setShowAuth]=useState(false);
  const [compareFirms,setCompareFirms]=useState([]);
  const [ppSection,setPpSection]=useState(null);
  const toggleCompare=(f)=>setCompareFirms(prev=>prev.find(x=>x.id===f.id)?prev.filter(x=>x.id!==f.id):prev.length<3?[...prev,f]:prev);
  const [showCompare,setShowCompare]=useState(false);

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{if(session)setUser(session.user)});
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setUser(session?.user||null)});
    return ()=>subscription.unsubscribe();
  },[]);

  const handleLogout = async ()=>{await supabase.auth.signOut();setUser(null);setTab("firms");};

  const sorted=useMemo(()=>{
    const a=[...FIRMS];
    if(sort==="pulse")a.sort((x,y)=>calcPulse(y.rating,y.reviews,y.name)-calcPulse(x.rating,x.reviews,x.name));
    if(sort==="rating")a.sort((x,y)=>y.rating-x.rating);
    if(sort==="newest")a.sort((x,y)=>y.founded-x.founded);
    if(sort==="alloc")a.sort((x,y)=>{const n=s=>{const v=parseFloat(s.replace(/[^0-9.]/g,''));return s.includes('M')?v*1000:v;};return n(y.maxAlloc)-n(x.maxAlloc)});
    return a;
  },[sort]);

  const goDetail=f=>{setSF(f);setPage("detail");window.scrollTo({top:0,behavior:"smooth"})};
  const goBack=()=>{setPage("home");window.scrollTo({top:0,behavior:"smooth"})};
  const goBlog=p=>{setBlogPost(p);setPage("blogpost");window.scrollTo({top:0,behavior:"smooth"})};
  const blogBack=()=>{setPage("home");setTab("blog");window.scrollTo({top:0,behavior:"smooth"})};

  // Shared layout wrapper
  const Shell = ({children,showSidebars=true}) => (
    <><style>{css}</style>
      <div className="bg-grid"/>
      <div className="bg-radial"/>
      <Particles/>
      <div className="top-line"/>
      <div className="page">
        <NavBar tab={tab} setTab={setTab} setPage={setPage} page={page} user={user} onLogin={()=>setShowAuth(true)} onLogout={handleLogout} setPpSection={setPpSection}/>
        {showSidebars ? (
          <div className="dashboard">
            <LeftSidebar tab={tab} setTab={t=>{setPage("home");setTab(t)}}/>
            <div className="main-content">{children}</div>
            <RightSidebar user={user} onLogin={()=>setShowAuth(true)}/>
          </div>
        ) : (
          <div style={{flex:1,padding:'0 0 40px'}}>{children}</div>
        )}
        <BottomFeed/>
        <Footer setPage={setPage} setTab={setTab}/>
      </div>
      {showAuth&&<AuthModal onClose={()=>setShowAuth(false)} onAuth={u=>{setUser(u);setShowAuth(false)}}/>}
      {compareFirms.length>=2&&!showCompare&&<div className="cmp-tray">
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {compareFirms.map(f=><div key={f.id} className="cmp-tray-chip" style={{borderColor:f.color+'40'}}>
            <span style={{color:f.color,fontWeight:700,fontSize:13}}>{f.name}</span>
            <button onClick={()=>toggleCompare(f)}>✕</button>
          </div>)}
        </div>
        <button className="cmp-tray-go" onClick={()=>setShowCompare(true)}>Compare {compareFirms.length} Firms</button>
        <button className="cmp-tray-clear" onClick={()=>setCompareFirms([])}>Clear</button>
      </div>}
      {showCompare&&<CompareOverlay firms={compareFirms} onClose={()=>setShowCompare(false)}/>}
    </>
  );

  // ── SUBPAGES ──
  if(page==="blogpost") return <Shell showSidebars={false}><div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}><BlogPostPage post={blogPost} goBack={blogBack}/></div></Shell>;
  if(page==="detail") return <Shell showSidebars={false}><div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}><DetailPage firm={sf} goBack={goBack}/></div></Shell>;
  if(page==="account") return <Shell showSidebars={false}><div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}><AccountPage user={user} goBack={()=>{setPage("home");window.scrollTo({top:0,behavior:"smooth"})}}/></div></Shell>;

  // ── HOME (Dashboard) ──
  return (
    <Shell>
      {/* HERO */}
      <div className="hero">
        <div className="hero-eyebrow">Live Deals · Instant Funding · Real Rewards</div>
        <h1 className="hero-title">
          Compare. Buy. <span className="cyan">Earn</span> <span className="orange">Rewards.</span>
        </h1>
        <p className="hero-sub">
          Save up to <b>90%</b> on every futures prop firm — then earn <b>Pulse Points</b> on each purchase. Redeem for free evaluations, instant funding accounts, and more.
        </p>
        <div className="hero-actions">
          {!user && <button className="btn-primary" onClick={()=>setShowAuth(true)}>Sign Up Free — Start Earning</button>}
          {user && <button className="btn-primary" onClick={()=>setTab('points')}>View My Rewards</button>}
          <button className="btn-secondary" onClick={()=>setTab('offers')}>Browse Deals</button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><b style={{color:'var(--orange)',textShadow:'0 0 12px rgba(255,149,0,0.4)'}}>90%</b><small>Max Discount</small></div>
          <div className="hero-stat"><b style={{color:'var(--cyan)',textShadow:'0 0 12px rgba(0,240,255,0.4)'}}>10</b><small>Partner Firms</small></div>
          <div className="hero-stat"><b style={{color:'var(--orange)',textShadow:'0 0 12px rgba(255,149,0,0.4)'}}>$150K</b><small>Given Away Weekly</small></div>
          <div className="hero-stat"><b style={{color:'var(--emerald)',textShadow:'0 0 12px rgba(0,212,165,0.4)'}}>Free</b><small>Accounts Earned</small></div>
        </div>
      </div>
      <div className="hero-divider"/>

      {/* SORT / VIEW CONTROLS (for firms tab) */}
      {tab==="firms"&&<>
        <div className="filters" style={{justifyContent:'center',marginBottom:20}}>
          <button className={`f-chip ${sort==="pulse"?"on":""}`} onClick={()=>setSort("pulse")}>Pulse Score</button>
          <button className={`f-chip ${sort==="rating"?"on":""}`} onClick={()=>setSort("rating")}>Top Rated</button>
          <button className={`f-chip ${sort==="newest"?"on":""}`} onClick={()=>setSort("newest")}>Newest</button>
          <button className={`f-chip ${sort==="alloc"?"on":""}`} onClick={()=>setSort("alloc")}>Highest Alloc</button>
          <span style={{width:1,height:24,background:'var(--bdr2)',margin:'0 4px'}}/>
          <button className={`f-chip ${view==="cards"?"on":""}`} onClick={()=>setView("cards")}>Cards</button>
          <button className={`f-chip ${view==="table"?"on":""}`} onClick={()=>setView("table")}>Table</button>
        </div>
        {view==="cards"?<FirmCards firms={sorted} onSelect={goDetail} user={user} compareFirms={compareFirms} toggleCompare={toggleCompare}/>
        :<FirmTable firms={sorted} onSelect={goDetail}/>}
      </>}

      {/* OTHER TABS */}
      {tab==="challenges"&&<ChallengesTab onSelect={goDetail}/>}
      {tab==="offers"&&<OffersTab user={user}/>}
      {tab==="giveaways"&&<GiveawaysTab/>}
      {tab==="blog"&&<BlogTab onSelect={goBlog}/>}
      {tab==="videos"&&<VideosTab/>}
      {tab==="points"&&<PulsePointsTab user={user} onLogin={()=>setShowAuth(true)} ppSection={ppSection} setPpSection={setPpSection}/>}

      {/* NEWSLETTER */}
      <Newsletter/>
    </Shell>
  );
}
