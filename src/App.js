import { useState, useMemo, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lwwtosuwfdliahoyqakx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3d3Rvc3V3ZmRsaWFob3lxYWt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDM0NDYsImV4cCI6MjA5MTMxOTQ0Nn0.RCcNmkTsgjInRlL3PwK2AP5bUUTx5G3f2XqYu0OrquU"
);

// ─── LOGOS (base64 embedded) ────────────────────────────────────────────────
const LOGOS = {
  "Tradeify": "data:image/jpeg;base64,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",
  "My Funded Futures": "data:image/png;base64,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",
  "Alpha Futures": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAABAGlDQ1BpY2MAABiVY2BgPMEABCwGDAy5eSVFQe5OChGRUQrsDxgYgRAMEpOLCxhwA6Cqb9cgai/r4lGHC3CmpBYnA+kPQKxSBLQcaKQIkC2SDmFrgNhJELYNiF1eUlACZAeA2EUhQc5AdgqQrZGOxE5CYicXFIHU9wDZNrk5pckIdzPwpOaFBgNpDiCWYShmCGJwZ3AC+R+iJH8RA4PFVwYG5gkIsaSZDAzbWxkYJG4hxFQWMDDwtzAwbDuPEEOESUFiUSJYiAWImdLSGBg+LWdg4I1kYBC+wMDAFQ0LCBxuUwC7zZ0hHwjTGXIYUoEingx5DMkMekCWEYMBgyGDGQCm1j8/yRb+6wAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH6gMYFSgOCQ510gAADDJJREFUWMONWH+sZVdV/r61z/3x3r133ptO25lx7Ew7Q6ctMm1jGghaLFKl/IMWYyNNY6FSKGQUDQnBVGKCGBlFGxJSyw9bENECFjWYdqAhIGhJtE2xLdIfzLR2ZqotU1J0Ou/de8/e6/OPvc+5580U4sl5950f+5z9nbW+9a21F7njLFYGM5qhMgZDCAhkFRh6DIZeUC8wBIaAnjEEVhWqwCqwCiqP9FiZgjGE8hLL1w1mZqZAGWlGI0KABRhpBgMMtApGmMkYbLIMgER3I0Cy/BchgBBEAFIeIAkSlA8glzngkiQXBEiSwwUX2gOXXJJTDnfIIcAhFyVIgZNloUxJoD2gAEEgIBPoKljyn7wAclH5XXkqZwIEupS8RQAX3eWCRHfm68nhYnkV4KIjcHloZIZS7KRsGrR/QrEKgPwdjcmEpGyVbBJIcoeLDQg44I4ktTiaMZCQymC64A4pYDSEslGEZlo2mAjPYJjvS4DoxUdwMV90wZ3ZWd56x5EWnoI7hAIlg06dke6Uyz1geZC/tqVRNoskosBg/vh818HiNZWvlCwfJ4eaby0TJHjKp5YEJSll18BdEoofvfk8BS71BYpi8UnhEkgWDIIaOkv5AhsHtbDkUiZpsQEWtpHokie5MwlJSE5v3L1wsUsKNuw3liGlHHB53u7chHJEUAC8sDszunDIC72y+5JYDOAdWN46F4VkhewlHpMHDHsEACt2KI5prNNwuUMwNfgEie319tSL2aQSVpmtXNBF8CR3yeEuOT0VFycPHPY7KrSIrhx56MzXmE2QwGLPPMRAA9HGGgDkqPYCsbFHS3nKWdjjXecGDHpZ/sAcXMKCTAsiN+cCZKSMJfogGlNMitFCkFRcnrUxZV94q0Yt1eTIaOhijr4kegaUw54NEi1kOyukoNZdABmKctEIsp7Nfur8C3ftOOfpY0eqXgXv2DWlDsE9a2djFZdK5BeplOCqTCbK4XDSQEF0gEqEESTJrOQmikBlAuiCQUk0IKYPvvPd27du+5m3/qpSAqzxNikpCgww5myFQCWDGcybdEY3YzCZKTCo32P38wHDwmutocqYYKwCQBpImlm9dvL1V7zuD/a/55yt2586euTBhx/sDQZe5BQkkaTome+U6KB7VzzlXX33gEFgE/UL8ghZFVm40NzoVQjW6JQ5MOgPPvmBA+f+5DkALjpvz+fvPXhyfa0Qvsl8XiemLO4pCxXd6WAn0+VgZFLgoOroc8tjLWIsn0msAvs9oLjSQohrJ2+45trfvO6tKSV3P3vLmWvr61+/75u9wUCemHMeCAfqGvLWEp24c2YRSk3+4XgIMM/fmkots0nSCojRkMGYPW2W3LeeedY/3/n3e3bucncAZvaD//nh5W+55rH/PDzoD105yxhAX5sCTjOQDKZMzRwchV4h10OmnC8lqkiNWokrZw539iraQg5o5vPZ/l+/Yc/OXTHGfD2muGVl9X033ITkACHCLSskK0N0xaSYvI6KSSmhjqqjz6PX0eta84h5Chz01Eh0U4aUgyJ+AoLZ0qAEBckQ6vns4pfv+/MPHBgOBgA8p6EQAOw7/8JvffvB7z15uOr3PVPJHaTqhOi5WGD+9izfuUZrcqI1dM6zN3VPY6ucvKzfkzURly1MvO8d+1cnk1k9N7O77/3KX33hTpJ1XVch/N479g8Gw5SiKWXqEAi9SjGhdkT35KiT5tFjRJ2aPaKuM4ca7kokc2ZoMxiripPlrCI0syrU0/U3/Pwv3nPHZ10KZu7+ql947X9//7lH7vu3zSsrMcaqqt72/vfecdffDMZjT0lN7eInp6pTllO07CEMhFmJlQ1yQ2phGwmiwEG/q9xyH47GN+//bZIpRgCf/MtPPXD/vz7z5OGP3PrR1rjvvfFdZ529ra5rZulwyWX9iu6IiTEhJcSEOim6J/eUVEfEtAFQ4Q1Z0pQD/QpZCUGQIYS4vn79m655zWWvjDH2+/2U0u2f+TRiwmD40Y/f9ugTj/d6vXldX3ju7v1vvt7X1nNmo2TuINGvEB0uxIzMGb0gS646BvYrnLYVPhlteQmBNMrMQqg9btu2/Y4Dt2xeWc1cDiFM16cH77m7tzw6efz5/52uvemNvyzJzC7Ze9E/fuNrzx5/rgpVKaUF0jCrJWeTvOVZxJFD+6UANRyyfh+DHom8egqVpenaze9+zy9deVVMic126SWX3PuNrx89dDiMxg898vDPvvrVL9u9Zz6fj0ejyWj8D/cerKqqDaXCplksDJVTTuRgzMugfrWgc3MECTRbHhYCmlmwej7b94qLb/vgnwz7g1LEAcm93+tt37b9zrv+NoTK19ae/q9nrr/2uqqqBLxi7wX3ffuBQ4e/V1U9L0W0aFQdlWIpI9CsgSCiAdSWYxkXBQ56rKoysZEM7vrI7//hZfsuqeu6qqqHH3/UzDaNxjGlC/fufezxxx65/4H+yuTJxx7bdd7un7700vl83u/1dm7/iTvv/pInB/LKS5KMRJ2NpHaZlfEF9qtWflT4LIRgg0EuHEGyF+La2huufP2B331/5k1K6erfunF9ffaay16ZUgohXLj3gs/+3RfW19YgffeJx6/7tWsnk0mMcc/OXU8dffrBB++veoNSA7lIKiWmVBiCFo8CemFRYrT5vt9TCGzUQlB/afn2A7fs3LGjjnUVqtu/+LmPf+b2Q88cu/rKq7Zs3lzX9fZt2068+OK/fPVr/cn4+JFnestLr7vitRnrRbv3fv7g3SdePGEg5Xn1TYB1ysLLRo0JLIQx00gSzTDow4xGmllV1Wsnb3rb2z924M/qGHtV9dzzz19+7dWHjh2pqmrPrnN3bN1Wu1tMP3j8ye989z9Iyn20PLpk38UkYRbOXP3OE4++8MILBsBTrmIJaFqrjqUGBJTzBUYDtrqcfdevcoOCucbwtHXr2d/60pd379xV13Wv17v5wx/60K23DFZWQNap9pgQCBLHng+1KxgBuft0CgIJWB2HLavmUIryqLxQTO7umtfFZU32rFocxXGWK9ZGNEjMpr9z4027d+6a1/N+r//QIw/f9qm/CEvLnlKMtSSYIQmBOGNTOvLsop4zA4AgrK2lQZUAWjAjvZRGIBCMdcqrrrwMPVWECDadAyfDfH1938WXvustvwEgWADwR3984IeHnxqef+481i8757zNK6suLxnQmHafSC+u85TujoSlfjVaOnrkyPePHw8oNU9bZVhOV6XkGA+7u02WuGmZm8fcMrGtq9g8vvOLd0maTqeS7vnyQSz1wniIrZteftXPPfv8cXefz+u6jnUd67quY5zX9en7+nQq6avf/Kf+jrPDti22dTPP2sQtE54x5qYljIeYLHGyxMkSOB5iNMh7xoRNS9g8CmetYClc+StvTCnNZ7MY42w2e9UVlyOgWhkh4NOf+2tJs9k0xrrZf9w2n88lXf/OtyOgOmMTVpa5aRmbljAptsBkiMlwg4UKpskSV0dYXR7v2v7AQ/8uaTabSbr1Ex+Dobc6RsDVb75Gkrtn/f3/bCklSUeOHj1n724Mgo2HHA05GnA04HhoDYYFqdnUaARMSLPZnovPPfbMscOHDlUhrE+nB/70w+gFd4fZnvN2H7z3KydOnMhV4o/fWpanlMbj8QV7Lzh6+EkOBnJH6e0ImYUQMRq8RAUCyAwGTaeIOS+Cgz6Claw3j4rxlNXbYs3yo04BODgcwFi6cHkVj9x3cUDkeNgN+w2wzNhm6CIF6pZNbV3QAmtmORUMOmus7OO2fG/LkLxQrTaIELv1dOkgtT2PLtiFerWN0Fbum97paY7TRnDecaaaFicDmnpoUeR3VGSx/GgUni/19S2y01RtA4ey2FBtG7qxTWds1Z34JbfOaoRqB3PxiBbu6L5E7Q871snFBk+xTWerFqbuZLQSbs1viwmAhaBgZPOVzWNsW4FNv6r8ZuY52HExisvQtshacNXpOF4S04YBydtVd3tQ6NwiamE1bb/S3S507hh3AyAs6tdT5u4SaINPpcXCrWm3bSTswkLsZu7cyi2dZt8QX6e4rJ2s66PTKNuxVttIbOJpw/jGb02rXW012kDp2qYLiABPy/Yd75x+vZHyxjendGoXnmmEd9EuQAeKdRjdfQFxevnRnf5H3WqN09FDnf5sGdghVOeJltTYeIv/Bx0ZVZDj3NmPAAAAHnRFWHRpY2M6Y29weXJpZ2h0AEdvb2dsZSBJbmMuIDIwMTasCzM4AAAAFHRFWHRpY2M6ZGVzY3JpcHRpb24Ac1JHQrqQcwcAAAAASUVORK5CYII=",
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
  { id:5, name:"Top One Futures", initials:"T1", logoUrl:"https://www.google.com/s2/favicons?domain=toponefutures.com&sz=128", founded:2024, rating:4.7, reviews:3041, pulse:87, trend:"up", maxAlloc:"$2.6M", country:"US", flag:"🇺🇸", platforms:["NinjaTrader","Tradovate","TradingView"], challenge:"1-Step Eval", steps:1, split:"90/10", target:"$5,000", dailyDD:"$1,500", maxDD:"$2,500", minPayout:"$300", paySpeed:"1–3 days", reset:"$90", hq:"Miami, FL", color:"#06b6d4", brandGrad:"linear-gradient(135deg,#06b6d4,#0891b2)", desc:"Rapidly growing with one of the highest max allocations in futures. Competitive rules and a strong trader community.", instantFund:true, sizes:["25K","50K","100K","150K"], payoutType:"Varies by Plan", minDaysPass:"1 day", drawdownType:"EOD Trailing", hasDLL:true, hasConsistency:true, consistencyPct:"Varies", newsTrading:true, eaAllowed:true },
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

const LOGO_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAOM0lEQVR4nNVYaZBc1XX+zr1v656lZ5dmRgKhDSKEigHsRGBAlKHIAhTYjJzCLhwSMARTBQ6ywAkYQSqF7RjbgbIjQpxyhQQnErFNAjZeZIyhJAtLAsyO5EhixDCa6Znp/W33npMfr4UkNCA5KSzlq+p+3a9fn/d976z3Ev4fYY2IM1ps9DqgFX5kR786t+1J52iTOlL82bgsfK3Kl5kW/6OJwoIA5ioAOOYFXLaj2uf1etftDfjKRMlgDAki0Fif8ovAMSrg9C1b3P55S/ocx/mjhq9XFR1emJBQAoIBwVpJ2wRl4BgU8Id7osW1Dn1ZSWE40TQUK1FWCJYVUhYwAMeqMGw0ji0BV26W7vHjzA3FTrqypjBoBb4FQRKCFQBGYBmwYPiGKjvHyyXgfylgjYh6aQL5qTxaKjG8VEFzHBEA5P1Ass8xlF8QLwAhjqD8QBBFCA6wE0SAO1ktrl/aV3vpua0V313wLdfmX3Hzclqq1OUhsIBSgFkhtQpIBEYEOtLTo2f0h7+xgNO3iNs+C6c9MoUPRcqeqhqYnyrqsIw8XFeBSCKx0IEHiIZQCs1aKdcVZVNRrpY6ABeAhiBVSIOGdz2An2y99owUwG6IvLFsR3lHqnPnW1GwTGAIlDWltEEFk4ISkb2Akt9AgNA5u5KTpgO+fYehFabC3RbiMRFEAaQIUASlGKQBLQKCyn5LBaQISmkQAE2AQwKHgDz4l7rDe+3AO130+uTAWK7wRROrIW5Y2ATI2einVvGttkbXGgo+bgJ+c9/1hxWw5EXxVKu9aCece2pTMs9GAgaBlAIRAEegNLIHQgA5gHYIUAARQAog3TySgAAoDbhKKm6S/P2PulreJnP/a6M922cV7jOGzq8ZYFI067DxlJTGrxq7ZMEbWLdu26zgDx7ybaAnj0TA6VskX8rz9dUabqs3pEAxwCAI7ScDAlgL4GSeIAcQVwCHQEQg3fQANQUqgqNFHCTfDirxf6C7lQFg40hxMOxs+xK76tI4BpKchamn22JbXTVy8fyRnrOebosf6Fm2t1bahE1zw30c1buRH14nutxmryhO4a9qY6rAk4CtEqQOcI1gy4AtA1wlmDpg6gJbJ1DDjEkU/ZJjC04YnAikeeRUIEbgN9Kn3eLUX25e1F0BgBfHx1vndrfeOhA4ly/URItcYLGbbB+ola8cWdG/FURSDwevDuW4de3Lu26BCB02hLYuxoJykf4iLEqHCgEBAYQsLiAQZjBloaIdZE/cT4qBalxzfLWxyWj5QOo6BGj4er9d0kbcVG3beNbcKQDYvl387iD8dBC4n8qBPBERhn1V1cJPrF0+8AqGRedP2XFxonru5nbHr3fT7V3fNbXZL8q9Ly+l5F0ECIWV9M8be9WJUgLYNgULIAQIEYgUoAiiGMYhaI9DnYT35rrKP3nmvBMiAI+/V3gCwM6dO4Pu3viGIPDu0BBPC4FEdknCN5ef6XkeAHKvvvBBq064x3Z5PvUrIM+q4anVk2W7HWvkv2YMocUbMFAt45PmLSgpASgTpCTgskDKAqkIpE7gOkMaAIUCvxFvaJ+uff1Pntxlnn15ZNHhyIuI7u6bfUU+cD+nFeUgALEtp6XomvFtm368ciVZAHB9ZU2X9jGoQb2A5BVSRk+D1NVzhtExowcmrb0gHKNOKisgFYgIZN+PRM3qgyyDPBHXxq96pdev/d7qoeqiSvcNrudcPDIyctHcufuT7R3kqVaLzs0H7l0g6YIALBirlMPrZve0bzjw2sqWh7e0XHH9w1Ff541ooSxUY1Ca2BWNqrN4Bg8ISYxzME6gikAaAqkBqAGoE1AFUAVsBZAqoGvJLrdSumFi9dDY4mrjwnzevcX3aEmh0HPGuzx8qtWis73AWUuKBgkEyzJZbzRuHxtr+8Ghl69hr6f4j6rAifjI8jAh2DpayPL5hwpYA6JY9aIKcBWQCoFrgNSyI9cAqQqoxFAVU9el6tfKI2NPTU1NDbqBd5vWepaI6tFaffiJJ544xMN79uxd5vnO1x2tFgEAs9hyqX7bxN62B5cupWQmxdNvvfi6buNx8lTWfw0DIRHHOGXGECJYQUigBoEsIJydV0QQEUAAOGAnKX0vfOv5bz7/t7O9vJ+/23PUBwEQETnaVR8++eST1wIY22d3cnJyTktL692uppMBgRXU6mFyZ29vx/3A/iidARZ518AQxAiIAdECjtB6qAfugHAqNYCBlCGRAKEAdYFUGagKpMbQ9cqTanp09RP3L7bz5y/8rBt4HyMRMHODCHAUnaqUt3Sf2d27d3fmcvkvOI6+QAASoUaS2nuTqLb2MOQxZ/lFs8lwn0osVAKomICYAIPqoR4gkpZ/S35c76W8DWNBla1OrSCMRaUpIAKQrTpp/Surlv/n2FDnzcO5nH+DUuKkKW+v16MHCoWWLxKhNQj8PwWwYWxsLF8odH7Z8/THCMphCOIk/Zc4bHypr6+v9l7kASBu8S9NjeRUQsC+ScATkNCrdLg/ZxCSbHIgAPTSSy+pQqGgOzo65rue/6DrqCERNMLQfG7jxte+ec65Jz7juc4SZlR/PfLGBwb6Bj/SknNuJ6Ecw6b1JH14/M03r1q0aFF8uDsP3CNzyz4/mlZlGQyBhCCOQHVJFOTl9+mff/h8y5K5A+0Dfe0dClG7r72857mBhfWIECjiVhJqc103z8yBAjwhBNbaFu2ok7RSZwGgOLbfKZUmrx0YGCiWa42bWnP+PYCoKDKPe54zpBTNAsTEcfqdvbXqjSf09Y0djvz8L0ihqPivkwif4gS+MAAWUEDQ/bIl35lc6gRtXVyyzLl6ovJKBU5BtdcaUWsjDttaW3NtucDtFpaeehR3+67TzoQWTjnPkLxLKi+CWmp5crwyvWrewEARAIjND6z1bnQcNS+X8y6EgCAMK/KLOMYt83p79x6O/CnfkM6Ruv1aVJJhxNoXEcACWgimTVIvkMcmp3PjM4fQOtHDwzMbnrjzZ1QdfZ3mn99JZw8NkV9u0ZXJCfpseVk0DGD9SvDERLG1vb3wDdd1Po4s7DhN7Qt79kxcsmDBwBszGh5ep3tXDOfsdNgpjne2ie3no7I6EREBQlBMEM2AJ1AL5OWufvno6OX+oTkwZ+NIjvtnXVMj3ceGBQaAAcAADIMNwCmABmfNLeLsewSo2JDXmHq0vHre5no9+mSQc+8jqBZj7dZKuX5tb2/h2Y7rRk+1fnAaO76B5zHEahLdxqBOIlrIlk7hmH8HIfmSUrM+ZUOj5C3c42W69Th19fgf6+8CJIdUoaCtd6BI+sYkpXkwGpIAYgSwAmIHbAExyM5HABKBNEWS8aBMejIRPjI2Rj/3POxVJEHYiG7p6Sk8l//E7tlhrevL3Mj9HgllQzFpKGGXNWkIabIAWAGWsoohAiECWizcfim39KubxpV+BKCZl5Sk/B5b57ykVsESkBJgAViCWMpm+lSAKiAVgAxl3kkESAmJbbmg4+ZXjlu7dt2uz6xa/Wga4ec9PW0/nTM8kkPScadF7jwSRYJssgUAJg3a15Fk35sAKpt9pNWIM8++kV/grFkyWz80fl426DV9czDmbk4vnFTqX01M3bDIyHJTQEqwMYNSQEoMqisgbXZq2/RCKsiHE3fU/q7/rmef3dkxdOq8Ms7cFLTmF6yKdOHzShwHit7RugRE2XpDiABiiAuoNsDtl6LfT491zNX/8GvBZqzcT35GD1Rj6TcJAkRNUm/3rqaYFEAdoDJBIgIZQNmsxYsVkAEiLlxSuOJX9w0NnTANrFHeh667LIw6biKlHAJBdFOACAhZqLBmkEOAx5AOgT8oVb9fr9cB/qmnWz//8jDN2PAOFrBGFMXcq6bF4ygLDbIKMAI0ZxBiAGVAlVWWvNzMDwuQaY4fhk6IbOdyAN9vPXPlkkRaViuRVmKKWVtWBIFWlhVbcZCKJ6mTo1i1Y9LrVa84HerxLsKPXv8MFQFgfCbmMwo4F8oUTadMO5pCgVgCDENs5gESgAyAaQaFKjuHZA8p8zgsVcTAwoBh0lSltgSAcrm0M4U8SGIsu2y0LzE8ZeBL7GpT9wKv4rSlFdOmJvOj0+OjfzMQApDie5B+dwG7djkSD3ZimhTH2ZOFbdZgZpAlqBDgkoZYAGyNQvjtBKN34b+jGG1VQe8KAa2HeWSYAcjEhmVPA3g6uwEhfUf0Nw74XDpC0u8qoDOZ50dl28clBiKAmMCCjKwAZAm2ZIGYICwgpCMuFx9Kvr/0PQYyes9J8/+KgwR4lZofVvweKesseW1Wpva1cU4FVFWZGGI4Unyo3v7cC+8nwcPhIAGmpF2q6XZUKeu+0qxAItlWTF2ABAAYpGs7XH7rq9H6lXZGy78lHCQgTdK8retZaLgg21yGMWXlzlIWsAKQ4tjj4p3Vn/3u5Aw2f6s4WMAUOqWhOqghkGZ9BhOEKWtehpDt56YbCPjh0aF8MA4SQBH1oUYe4ma9VwAsQJzlgGIA2pZdnvxWbdPCI6107ysOXhPHNIi6aIoJlGbrTjLY/2IRzeUna8mvHnu/q8uR4iAPiKGTOFJQKZDNJ/tmq2bLV+HLjpm6FVsvbsxk7Gjg4BAycjwlAAxnhCnLA4FA62iPltqnq1tPfPXoUJ0ZB4SQkBg9qIyAWA6Ie4YiO+pS49bavKeePnpUZ8Z+Acv3BEjVIBggVhDONrjIibYpt3F9hXevw1Gu+TPh7RCa3dHROh2qHpKsApFjU+2H67VK1lQ29+4AzjgmkvadeFsAsxnQoesJyCg/flM75a9UnF0PYNOZM+4wHyt4W4CwDCo2Zbj233PB9NqJjXOeO4q8jhgHeKCY+H77sJpSv5jYNuew233HCv4HZXiLM9R1kRAAAAAASUVORK5CYII=";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');
:root{
  --bg:#050810;--bg1:#080c16;--bg2:#0c1220;--bg3:#12192e;--bg4:#182040;
  --glass:rgba(8,14,28,0.65);--glass2:rgba(6,10,20,0.88);
  --bdr:rgba(6,182,212,0.08);--bdr2:rgba(6,182,212,0.15);--bdr3:rgba(6,182,212,0.35);
  --em:#22d3ee;--em2:#67e8f9;--em3:#a5f3fc;--emA:rgba(6,182,212,0.1);--emA2:rgba(6,182,212,0.18);
  --green:#10b981;--red:#ff4757;--amber:#ffbe0b;--gold:#fbbf24;
  --t1:#f0f9ff;--t2:#bae6fd;--t3:#7dd3fc;--t4:#38bdf8;--t5:#0284c7;
  --serif:'Outfit',system-ui,sans-serif;
  --sans:'Outfit',system-ui,-apple-system,sans-serif;
  --mono:'JetBrains Mono',ui-monospace,monospace;
  --glow:0 0 4px #22d3ee,0 0 12px rgba(6,182,212,0.5),0 0 28px rgba(6,182,212,0.2),0 0 60px rgba(6,182,212,0.08);
  --glow-sm:0 0 4px rgba(6,182,212,0.6),0 0 10px rgba(6,182,212,0.3);
  --glow-box:0 0 1px rgba(6,182,212,0.3),0 0 8px rgba(6,182,212,0.15),0 0 24px rgba(6,182,212,0.08),0 0 48px rgba(6,182,212,0.04);
  --glow-gold:0 0 4px #fbbf24,0 0 12px rgba(251,191,36,0.4),0 0 28px rgba(251,191,36,0.15);
  --glow-gold-sm:0 0 4px rgba(251,191,36,0.5),0 0 10px rgba(251,191,36,0.25);
  --glow-green:0 0 4px rgba(16,185,129,0.5),0 0 10px rgba(16,185,129,0.25);
  --glow-red:0 0 4px rgba(255,71,87,0.4),0 0 10px rgba(255,71,87,0.2);
}
*{margin:0;padding:0;box-sizing:border-box}
body,#root{background:var(--bg);color:var(--t1);font-family:var(--sans);font-size:15px;line-height:1.6;min-height:100vh;-webkit-font-smoothing:antialiased;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(6,182,212,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.035) 1px,transparent 1px);background-size:50px 50px;pointer-events:none;z-index:0}
::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(34,211,238,0.2);border-radius:3px;box-shadow:0 0 6px rgba(34,211,238,0.3)}

/* ── AMBIENT ── */
.ambient{position:fixed;inset:0;z-index:0;pointer-events:none}
.ambient::before{content:'';position:absolute;width:2200px;height:900px;top:-250px;left:50%;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(6,182,212,0.35) 0%,rgba(34,211,238,0.14) 20%,rgba(251,191,36,0.08) 40%,transparent 60%);border-radius:50%;animation:ambPulse 8s ease-in-out infinite}
.ambient::after{content:'';position:absolute;width:1400px;height:1400px;bottom:-400px;right:-300px;background:radial-gradient(circle,rgba(251,191,36,0.14) 0%,rgba(251,191,36,0.06) 25%,rgba(6,182,212,0.04) 45%,transparent 60%);border-radius:50%;animation:ambPulse 12s ease-in-out infinite reverse}
@keyframes ambPulse{0%,100%{opacity:1;transform:translateX(-50%) scale(1)}50%{opacity:.7;transform:translateX(-50%) scale(1.05)}}
.ambient-gold{position:absolute;width:1200px;height:1200px;top:20%;left:-300px;background:radial-gradient(circle,rgba(251,191,36,0.1) 0%,rgba(251,191,36,0.04) 30%,transparent 55%);border-radius:50%}
.edge-glow{position:fixed;top:0;left:0;right:0;bottom:0;z-index:0;pointer-events:none;box-shadow:inset 0 3px 0 0 rgba(34,211,238,0.5),inset 0 0 40px rgba(34,211,238,0.04),inset 0 3px 30px rgba(34,211,238,0.12)}
.side-glow-l,.side-glow-r{position:fixed;top:0;bottom:0;width:3px;z-index:0;pointer-events:none}
.side-glow-l{left:0;background:rgba(34,211,238,0.18);box-shadow:0 0 100px 40px rgba(6,182,212,0.18),0 0 250px 100px rgba(6,182,212,0.12),0 0 500px 180px rgba(6,182,212,0.06)}
.side-glow-r{right:0;background:rgba(251,191,36,0.18);box-shadow:0 0 100px 40px rgba(251,191,36,0.18),0 0 250px 100px rgba(251,191,36,0.12),0 0 500px 180px rgba(251,191,36,0.06)}
.top-glow{position:fixed;top:0;left:0;right:0;height:4px;z-index:101;pointer-events:none;background:linear-gradient(90deg,rgba(6,182,212,0.5),rgba(34,211,238,1),rgba(251,191,36,0.8),rgba(34,211,238,1),rgba(6,182,212,0.5));box-shadow:0 0 50px rgba(34,211,238,0.8),0 0 120px rgba(34,211,238,0.4),0 0 250px rgba(34,211,238,0.18)}
.page{position:relative;z-index:1;overflow-x:hidden}

/* ── TICKER ── */
.ticker{background:rgba(8,12,22,0.9);border-bottom:1px solid var(--bdr2);height:34px;overflow:hidden;box-shadow:0 2px 16px rgba(6,182,212,0.08)}
.ticker-track{display:flex;align-items:center;gap:32px;height:100%;white-space:nowrap;animation:tScroll 60s linear infinite;padding:0 20px}
@keyframes tScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.tick{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:600;color:var(--t3);flex-shrink:0}
.tick b{color:var(--gold);font-family:var(--mono);font-size:11px;font-weight:700;text-shadow:var(--glow-gold-sm)}
.tick-name{color:var(--em2);font-weight:700;text-shadow:0 0 8px rgba(6,182,212,0.2)}
.tick-sep{color:var(--t5);font-size:8px}

/* ── NAV ── */
.nav{position:sticky;top:0;z-index:100;background:var(--glass2);backdrop-filter:blur(24px) saturate(1.3);border-bottom:1px solid var(--bdr2);height:56px;display:flex;align-items:center;padding:0 36px;gap:12px;box-shadow:0 4px 40px rgba(6,182,212,0.12),0 0 100px rgba(6,182,212,0.05)}
.nav::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.3),rgba(34,211,238,0.4),rgba(251,191,36,0.3),transparent)}
.nav-logo{display:flex;align-items:center;gap:9px;cursor:pointer;margin-right:auto}
.nav-logo-mark{width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#22d3ee,#0891b2);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:#050810;box-shadow:var(--glow-sm)}
.nav-logo img{width:28px;height:28px;border-radius:6px}
.nav-logo-text{font-size:16px;font-weight:700;letter-spacing:-.4px;color:var(--t1);text-shadow:0 0 12px rgba(6,182,212,0.15)}
.nav-logo-text span{color:var(--em);text-shadow:var(--glow-sm)}
.nav-tabs{display:flex;gap:2px}
.nav-tab{background:none;border:none;color:var(--t3);font-family:var(--sans);font-size:13px;font-weight:600;padding:8px 16px;border-radius:6px;cursor:pointer;transition:all .15s}
.nav-tab:hover{color:var(--em);background:var(--emA);text-shadow:0 0 8px rgba(6,182,212,0.3)}
.nav-tab.on{color:var(--em);background:var(--emA2);text-shadow:var(--glow-sm);box-shadow:0 0 12px rgba(6,182,212,0.08)}
.nav-code{font-family:var(--mono);font-size:12px;font-weight:700;color:#050810;background:linear-gradient(135deg,#fbbf24,#f59e0b);border:none;padding:7px 16px;border-radius:6px;cursor:pointer;transition:all .2s;margin-left:8px;box-shadow:var(--glow-gold-sm)}
.nav-code:hover{box-shadow:var(--glow-gold);transform:translateY(-1px)}
.nav-burger{display:none;background:none;border:none;color:var(--em);font-size:22px;cursor:pointer;padding:4px 8px;text-shadow:var(--glow-sm)}
.mob-menu{position:fixed;top:0;left:0;right:0;bottom:0;background:var(--bg);z-index:99;padding:96px 16px 20px;display:flex;flex-direction:column;gap:4px;overflow-y:auto}
.mob-menu button{background:none;border:none;color:var(--t3);font-family:var(--sans);font-size:17px;font-weight:600;padding:16px 18px;text-align:left;border-radius:10px;cursor:pointer;border-bottom:1px solid var(--bdr)}
.mob-menu button:hover{color:var(--em);text-shadow:var(--glow-sm)}
.mob-menu button.on{color:var(--em);background:var(--emA2);text-shadow:var(--glow-sm);box-shadow:inset 0 0 20px rgba(6,182,212,0.05)}

/* ── WRAP ── */
.wrap{max-width:1240px;margin:0 auto;padding:0 36px}

/* ── HERO ── */
.hero{position:relative;text-align:center;max-width:800px;margin:0 auto;padding:60px 0 44px}
.hero::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:500px;background:radial-gradient(circle,rgba(6,182,212,0.06) 0%,rgba(251,191,36,0.03) 40%,transparent 65%);border-radius:50%;pointer-events:none}
.hero-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.25),rgba(34,211,238,0.3),rgba(251,191,36,0.25),transparent);margin-bottom:28px}
.hero-code{font-family:var(--mono);font-size:52px;font-weight:900;letter-spacing:12px;background:linear-gradient(180deg,#fde68a,#fbbf24,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 8px rgba(251,191,36,0.4)) drop-shadow(0 0 20px rgba(251,191,36,0.2)) drop-shadow(0 0 40px rgba(251,191,36,0.1));margin-bottom:20px;animation:heroFloat 6s ease-in-out infinite}
@keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.hero h1{font-family:var(--sans);font-size:28px;font-weight:700;line-height:1.35;letter-spacing:-.2px;color:var(--t2);margin-bottom:14px}
.hero h1 em{font-style:normal;font-weight:800;color:var(--em);text-shadow:var(--glow-sm)}
.hero h1 .gold{font-weight:800;color:var(--gold);text-shadow:var(--glow-gold-sm)}
.hero p{color:var(--t4);font-size:14px;line-height:1.6;max-width:480px;margin:0 auto 20px}
.hero-pills{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:28px}
.hero-pill{font-size:12px;font-weight:600;padding:7px 16px;border-radius:24px;border:1px solid var(--bdr2);background:rgba(8,14,28,0.7);backdrop-filter:blur(8px);color:var(--t3);display:flex;align-items:center;gap:5px;transition:all .2s}
.hero-pill:hover{border-color:var(--bdr3);box-shadow:var(--glow-box)}
.hero-pill b{color:var(--gold);text-shadow:0 0 6px rgba(251,191,36,0.3)}
.hero-pill .cy{color:var(--em);text-shadow:0 0 6px rgba(6,182,212,0.3)}
.hero-stats{display:flex;justify-content:center;gap:36px;padding-top:22px;border-top:1px solid rgba(251,191,36,0.08)}
.hero-stat{text-align:center}
.hero-stat b{font-family:var(--mono);font-size:22px;font-weight:800;display:block}
.hero-stat small{font-size:10px;color:var(--t4);font-weight:600;margin-top:3px;display:block;text-transform:uppercase;letter-spacing:.5px}

/* ── TABS ── */
.ctabs{display:flex;justify-content:center;gap:2px;margin-bottom:28px;border-bottom:1px solid var(--bdr);padding-bottom:0;position:relative;scrollbar-width:none;-ms-overflow-style:none}
.ctabs::-webkit-scrollbar{display:none}
.ctabs::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(34,211,238,0.15),transparent)}
.ctab{background:none;border:none;color:var(--t4);font-family:var(--sans);font-size:13.5px;font-weight:600;padding:11px 18px;cursor:pointer;transition:all .15s;position:relative;border-bottom:2px solid transparent;margin-bottom:-1px}
.ctab:hover{color:var(--em);text-shadow:0 0 8px rgba(6,182,212,0.2)}
.ctab.on{color:var(--em);border-bottom-color:var(--gold);text-shadow:var(--glow-sm);box-shadow:0 4px 12px rgba(251,191,36,0.1)}

/* ── SECTION HEADERS ── */
.sec-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:8px}
.sec-title{font-size:15px;font-weight:700;background:linear-gradient(135deg,var(--em2),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 6px rgba(251,191,36,0.15))}
.sec-sub{font-size:12px;color:var(--t4);margin-top:2px}

/* ── FILTERS ── */
.filters{display:flex;gap:5px;flex-wrap:wrap}
.f-btn{background:var(--bg2);border:1px solid var(--bdr);color:var(--t4);font-family:var(--sans);font-size:12px;font-weight:600;padding:6px 14px;border-radius:6px;cursor:pointer;transition:all .15s}
.f-btn:hover{border-color:var(--bdr2);color:var(--em);text-shadow:0 0 6px rgba(6,182,212,0.2)}
.f-btn.on{background:var(--emA2);border-color:var(--bdr3);color:var(--em);box-shadow:0 0 10px rgba(6,182,212,0.12),inset 0 0 12px rgba(6,182,212,0.05);text-shadow:var(--glow-sm)}
.view-tog{display:flex;gap:2px;background:var(--bg2);border:1px solid var(--bdr2);border-radius:7px;padding:2px}
.vt{background:none;border:none;color:var(--t5);font-family:var(--sans);font-size:12px;font-weight:600;padding:5px 12px;border-radius:5px;cursor:pointer;transition:all .12s}
.vt:hover{color:var(--em)}
.vt.on{background:var(--bg3);color:var(--em);text-shadow:var(--glow-sm);box-shadow:0 0 8px rgba(6,182,212,0.08)}

/* ── PULSE LEADERBOARD ── */
.lb{margin-bottom:36px}
.lb-hdr{display:grid;grid-template-columns:28px 36px 1fr 170px 64px 56px 90px;align-items:center;gap:12px;padding:0 18px 10px;font-size:10px;font-weight:700;color:var(--em);text-transform:uppercase;letter-spacing:.8px;text-shadow:0 0 6px rgba(6,182,212,0.15)}
.lb-row{display:grid;grid-template-columns:28px 36px 1fr 170px 64px 56px 90px;align-items:center;gap:12px;padding:13px 18px;border-radius:10px;background:var(--glass);backdrop-filter:blur(6px);border:1px solid var(--bdr);cursor:pointer;transition:all .25s;margin-bottom:5px;position:relative;overflow:hidden;box-shadow:0 0 1px rgba(6,182,212,0.1)}
.lb-row::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(34,211,238,0.1),transparent)}
.lb-row:hover{border-color:var(--bdr3);background:var(--bg2);box-shadow:var(--glow-box);transform:translateX(3px)}
.lb-row:hover::before{background:linear-gradient(90deg,transparent,rgba(34,211,238,0.5),transparent)}
.lb-rank{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--t4);text-align:center}
.lb-row:nth-child(-n+3) .lb-rank{color:var(--em);text-shadow:var(--glow-sm);font-size:13px}
.lb-logo{width:36px;height:36px;border-radius:8px;overflow:hidden;background:var(--bg3);border:1px solid var(--bdr2);flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 0 6px rgba(6,182,212,0.06)}
.lb-logo img{width:100%;height:100%;object-fit:contain;padding:3px}
.lb-logo-fb{font-size:10px;font-weight:800;color:#fff}
.lb-name-c{min-width:0}
.lb-name{font-size:14px;font-weight:700;color:var(--t1);display:flex;align-items:center;gap:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lb-meta{font-size:11px;color:var(--t4);margin-top:2px}
.lb-bar-c{position:relative;height:24px}
.lb-bar-bg{position:absolute;inset:0;background:var(--bg4);border-radius:5px;overflow:hidden;box-shadow:inset 0 0 8px rgba(0,0,0,0.3)}
.lb-bar-fill{height:100%;border-radius:5px;background:linear-gradient(90deg,rgba(6,182,212,0.9),rgba(34,211,238,0.6),rgba(103,232,249,0.3));transition:width .8s cubic-bezier(.22,1,.36,1);position:relative;box-shadow:0 0 8px rgba(34,211,238,0.4)}
.lb-bar-fill::after{content:'';position:absolute;right:0;top:0;bottom:0;width:4px;background:#67e8f9;border-radius:0 5px 5px 0;box-shadow:0 0 6px #22d3ee,0 0 14px rgba(34,211,238,0.5),0 0 28px rgba(34,211,238,0.2)}
.lb-score{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-family:var(--mono);font-size:13px;font-weight:800;color:#fff;text-shadow:0 0 4px rgba(0,0,0,0.8),0 0 8px rgba(34,211,238,0.3);z-index:1}
.lb-rating{font-family:var(--mono);font-size:12px;font-weight:700;text-align:center;color:var(--em2);text-shadow:0 0 6px rgba(6,182,212,0.2)}
.lb-trend{font-size:11px;font-weight:700;text-align:center}
.lb-deal{font-family:var(--mono);font-size:11px;font-weight:700;color:var(--gold);background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.15);padding:5px 12px;border-radius:5px;text-align:center;cursor:pointer;transition:all .2s;text-shadow:var(--glow-gold-sm)}
.lb-deal:hover{border-color:rgba(251,191,36,0.3);background:rgba(251,191,36,0.15);box-shadow:var(--glow-gold)}
.lb-deal-na{color:var(--t5);text-align:center;font-size:11px}
.tp{color:var(--gold);font-size:10px;text-shadow:var(--glow-gold-sm)}

/* ── FIRM CARDS ── */
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(360px,100%),1fr));gap:14px}
.fcard{background:var(--glass);backdrop-filter:blur(8px);border:1px solid var(--bdr2);border-radius:14px;padding:24px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden;border-left:3px solid var(--card-accent,var(--em));box-shadow:0 0 2px var(--card-accent,rgba(6,182,212,0.3)),0 0 16px rgba(0,0,0,0.2),0 0 30px var(--card-glow,rgba(6,182,212,0.04))}
.fcard::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--card-accent,rgba(6,182,212,0.3)),rgba(34,211,238,0.1),transparent)}
.fcard::after{content:'';position:absolute;top:0;left:0;bottom:0;width:100px;background:linear-gradient(90deg,var(--card-glow,rgba(6,182,212,0.04)),transparent);pointer-events:none;transition:opacity .3s}
.fcard:hover{border-color:var(--card-accent,var(--bdr3));background:var(--bg2);transform:translateY(-4px);box-shadow:0 0 2px var(--card-accent,rgba(6,182,212,0.4)),0 0 16px var(--card-glow,rgba(6,182,212,0.15)),0 0 40px var(--card-glow,rgba(6,182,212,0.06)),0 16px 48px rgba(0,0,0,0.3)}
.fcard:hover::before{background:linear-gradient(90deg,var(--card-accent,rgba(6,182,212,0.6)),rgba(251,191,36,0.2),transparent)}
.fcard-top{display:flex;align-items:center;gap:14px;margin-bottom:16px}
.fcard-logo{width:42px;height:42px;border-radius:10px;overflow:hidden;background:var(--bg3);border:1px solid var(--bdr2);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 0 8px rgba(6,182,212,0.06)}
.fcard-logo img{width:100%;height:100%;object-fit:contain;padding:4px}
.fcard-logo-fb{font-size:11px;font-weight:800;color:#fff}
.fcard-info{flex:1;min-width:0}
.fcard-name{font-size:15px;font-weight:700;display:flex;align-items:center;gap:5px}
.fcard-sub{font-size:11px;color:var(--t4);margin-top:2px}
.fcard-deal{font-family:var(--mono);font-size:11px;font-weight:700;color:var(--gold);background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.15);padding:4px 10px;border-radius:5px;text-shadow:var(--glow-gold-sm)}
.fcard-desc{font-size:13px;color:var(--t4);line-height:1.55;margin-bottom:16px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.fcard-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px}
.fcard-stat{background:var(--bg3);border:1px solid var(--bdr);border-radius:7px;padding:10px 12px}
.fcard-sl{font-size:9px;color:var(--em);text-transform:uppercase;letter-spacing:.7px;font-weight:700;text-shadow:0 0 6px rgba(6,182,212,0.15)}
.fcard-sv{font-family:var(--mono);font-size:12px;font-weight:700;margin-top:3px;color:var(--t1)}
.fcard-foot{display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--bdr)}
.fcard-pulse{display:flex;align-items:center;gap:7px}
.fcard-pl{font-size:10px;color:var(--gold);font-weight:700;text-transform:uppercase;letter-spacing:.5px;text-shadow:0 0 6px rgba(251,191,36,0.2)}
.fcard-pv{font-family:var(--mono);font-size:18px;font-weight:800;color:var(--gold);text-shadow:var(--glow-gold);animation:pulsGlow 3s ease-in-out infinite}
@keyframes pulsGlow{0%,100%{text-shadow:var(--glow-gold)}50%{text-shadow:0 0 6px #fde68a,0 0 18px rgba(251,191,36,0.5),0 0 40px rgba(251,191,36,0.25),0 0 80px rgba(251,191,36,0.1)}}
.fcard-btn{background:var(--emA2);border:1px solid var(--bdr3);color:var(--em);font-family:var(--sans);font-size:12px;font-weight:700;padding:7px 18px;border-radius:7px;cursor:pointer;transition:all .2s;text-shadow:0 0 6px rgba(6,182,212,0.2)}
.fcard-btn:hover{background:var(--em);color:#050810;border-color:var(--em);box-shadow:var(--glow-sm)}

/* ── TABLE ── */
.tbl-wrap{border:1px solid var(--bdr2);border-radius:12px;overflow-x:auto;-webkit-overflow-scrolling:touch;background:var(--glass);box-shadow:0 0 1px rgba(6,182,212,0.1),0 0 20px rgba(0,0,0,0.2)}
.tbl{width:100%;border-collapse:collapse;min-width:900px}
.tbl th{background:var(--bg2);padding:12px 16px;font-size:10px;font-weight:700;color:var(--em);text-transform:uppercase;letter-spacing:.8px;text-align:left;border-bottom:1px solid var(--bdr2);white-space:nowrap;text-shadow:0 0 6px rgba(6,182,212,0.15)}
.tbl td{padding:12px 16px;font-size:13px;border-bottom:1px solid var(--bdr);color:var(--t2);white-space:nowrap}
.tbl tbody tr{cursor:pointer;transition:all .15s}
.tbl tbody tr:hover{background:rgba(6,182,212,0.05);box-shadow:inset 0 0 20px rgba(6,182,212,0.03)}
.tbl .mono{font-family:var(--mono);font-weight:600;color:var(--em2)}
.tbl .good{color:var(--green);font-weight:700;text-shadow:var(--glow-green)}
.tbl .warn{color:var(--amber);text-shadow:var(--glow-gold-sm)}

/* ── CHALLENGES ── */
.ch-wrap{border:1px solid var(--bdr2);border-radius:12px;overflow-x:auto;-webkit-overflow-scrolling:touch;background:var(--glass);box-shadow:0 0 1px rgba(6,182,212,0.1),0 0 20px rgba(0,0,0,0.2)}

/* ── OFFERS ── */
.offers-list{display:flex;flex-direction:column;gap:8px}
.offer-row{display:flex;align-items:center;gap:18px;padding:16px 20px;background:var(--glass);backdrop-filter:blur(6px);border:1px solid var(--bdr2);border-radius:12px;transition:all .2s;position:relative;overflow:hidden;box-shadow:0 0 1px rgba(6,182,212,0.1)}
.offer-row::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,var(--card-accent,rgba(251,191,36,0.15)),transparent)}
.offer-row:hover{border-color:var(--bdr3);background:var(--bg2);box-shadow:var(--glow-box)}
.offer-row:hover::before{background:linear-gradient(90deg,var(--card-accent,rgba(251,191,36,0.5)),rgba(34,211,238,0.2),transparent)}
.offer-pct{font-family:var(--mono);font-size:18px;font-weight:800;color:var(--gold);min-width:90px;text-shadow:var(--glow-gold)}
.offer-info{flex:1;min-width:0}
.offer-firm{font-size:14px;font-weight:700;color:var(--t1);display:flex;align-items:center;gap:7px}
.offer-desc{font-size:12px;color:var(--t4);margin-top:3px;line-height:1.5}
.offer-tag{font-size:9px;font-weight:700;color:var(--gold);background:rgba(251,191,36,0.1);border:1px solid rgba(251,191,36,0.15);padding:2px 7px;border-radius:4px;text-transform:uppercase;letter-spacing:.4px;text-shadow:0 0 4px rgba(251,191,36,0.3)}
.offer-code{font-family:var(--mono);font-size:13px;font-weight:700;color:var(--em);background:var(--bg3);padding:8px 16px;border-radius:6px;border:1px solid var(--bdr3);cursor:pointer;transition:all .2s;white-space:nowrap;text-shadow:0 0 6px rgba(6,182,212,0.2)}
.offer-code:hover{background:var(--em);color:#050810;border-color:var(--em);box-shadow:var(--glow-sm);text-shadow:none}

/* ── GIVEAWAY ── */
.gw-prize{background:var(--glass);backdrop-filter:blur(8px);border:1px solid var(--bdr2);border-radius:16px;padding:32px;text-align:center;position:relative;overflow:hidden;margin-bottom:24px;box-shadow:0 0 1px rgba(6,182,212,0.2),0 0 30px rgba(0,0,0,0.2)}
.gw-prize::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),var(--em),var(--gold),transparent)}
.gw-prize::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center top,rgba(6,182,212,0.06) 0%,transparent 60%);pointer-events:none}
.gw-val{font-family:var(--mono);font-size:36px;font-weight:800;color:var(--gold);margin:10px 0;text-shadow:var(--glow-gold);animation:pulsGlow 3s ease-in-out infinite}
.gw-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:24px 0}
.gw-step{background:var(--glass);backdrop-filter:blur(6px);border:1px solid var(--bdr2);border-radius:12px;padding:20px;text-align:center;transition:all .2s;box-shadow:0 0 1px rgba(6,182,212,0.1)}
.gw-step:hover{border-color:var(--bdr3);box-shadow:var(--glow-box)}
.gw-step-n{font-family:var(--mono);font-size:22px;font-weight:800;color:var(--em);text-shadow:var(--glow-sm)}
.gw-step-t{font-size:13px;font-weight:700;margin:6px 0 3px;color:var(--t1)}
.gw-step-d{font-size:11px;color:var(--t4);line-height:1.45}
.gw-btn{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#050810;font-family:var(--sans);font-size:15px;font-weight:700;padding:14px 36px;border:none;border-radius:9px;cursor:pointer;box-shadow:var(--glow-gold),0 4px 16px rgba(0,0,0,0.3);transition:all .2s}
.gw-btn:hover{box-shadow:0 0 6px #fde68a,0 0 18px rgba(251,191,36,0.5),0 0 40px rgba(251,191,36,0.25),0 0 80px rgba(251,191,36,0.1),0 6px 20px rgba(0,0,0,0.3);transform:translateY(-2px)}
.gw-rules{background:var(--glass);border:1px solid var(--bdr2);border-radius:12px;padding:20px;margin-top:24px}
.gw-rules h4{font-size:13px;font-weight:700;margin-bottom:10px;color:var(--em2);text-shadow:0 0 8px rgba(6,182,212,0.15)}
.gw-rules li{color:var(--t3);font-size:12px;line-height:1.7;list-style:none;padding-left:18px;position:relative}
.gw-rules li::before{content:'\\2713';position:absolute;left:0;color:var(--em);font-size:10px;text-shadow:var(--glow-sm)}

/* ── BLOG ── */
.blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(340px,100%),1fr));gap:12px}
.blog-card{background:var(--glass);backdrop-filter:blur(6px);border:1px solid var(--bdr2);border-radius:12px;padding:24px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden;box-shadow:0 0 1px rgba(6,182,212,0.1)}
.blog-card:hover{border-color:var(--card-accent,var(--bdr3));background:var(--bg2);transform:translateY(-2px);box-shadow:0 0 2px var(--card-accent,rgba(6,182,212,0.3)),0 0 16px var(--card-glow,rgba(6,182,212,0.1)),0 8px 28px rgba(0,0,0,0.25)}
.blog-cat{font-family:var(--mono);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
.blog-title{font-family:var(--sans);font-size:18px;font-weight:700;line-height:1.35;margin-bottom:8px;color:var(--t1)}
.blog-excerpt{font-size:13px;color:var(--t4);line-height:1.55;margin-bottom:10px}
.blog-date{font-size:11px;color:var(--t5)}

/* ── BLOG POST ── */
.blog-body{font-size:16px;line-height:1.8;color:var(--t2)}
.blog-h2{font-family:var(--sans);font-size:22px;font-weight:700;margin:32px 0 12px;color:var(--em2);text-shadow:0 0 10px rgba(6,182,212,0.15)}
.blog-p{margin:0 0 18px;line-height:1.8}
.blog-p strong{color:var(--em2);font-weight:700}

/* ── DETAIL ── */
.det{padding:36px 0 60px}
.det-back{display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid var(--bdr2);color:var(--t3);font-family:var(--sans);font-size:12px;font-weight:600;padding:7px 16px;border-radius:7px;cursor:pointer;margin-bottom:24px;transition:all .15s}
.det-back:hover{border-color:var(--em);color:var(--em);text-shadow:var(--glow-sm);box-shadow:0 0 12px rgba(6,182,212,0.08)}
.det-hero{display:flex;align-items:center;gap:20px;margin-bottom:28px}
.det-name{font-family:var(--sans);font-size:30px;font-weight:800;letter-spacing:-.3px}
.det-sub{font-size:13px;color:var(--t4);margin-top:3px}
.det-pulse-badge{background:var(--bg2);border:1px solid var(--bdr2);border-radius:9px;padding:6px 14px;display:inline-flex;align-items:center;gap:7px;margin-top:10px;box-shadow:0 0 12px rgba(6,182,212,0.06)}
.det-pulse-lbl{font-size:10px;color:var(--t4);font-weight:700;text-transform:uppercase;letter-spacing:.5px}
.det-pulse-v{font-family:var(--mono);font-size:20px;font-weight:800;color:var(--gold);text-shadow:var(--glow-gold)}
.det-deal{display:flex;align-items:center;gap:16px;padding:14px 20px;background:var(--glass);border:1px solid var(--bdr2);border-radius:10px;margin-bottom:24px;box-shadow:0 0 1px rgba(6,182,212,0.15)}
.det-desc{background:var(--glass);backdrop-filter:blur(6px);border:1px solid var(--bdr2);border-radius:12px;padding:22px;color:var(--t2);font-size:14px;line-height:1.75}
.det-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:10px;margin-bottom:24px}
.det-stat{background:var(--glass);border:1px solid var(--bdr);border-radius:9px;padding:14px 16px}
.det-stat-l{font-size:10px;color:var(--em);text-transform:uppercase;letter-spacing:.8px;font-weight:700;text-shadow:0 0 6px rgba(6,182,212,0.15)}
.det-stat-v{font-family:var(--mono);font-size:13px;font-weight:700;margin-top:4px;color:var(--t1)}
.det-section{background:var(--glass);border:1px solid var(--bdr2);border-radius:12px;overflow:hidden;margin-bottom:18px;box-shadow:0 0 1px rgba(6,182,212,0.1)}
.info-row{display:flex;justify-content:space-between;align-items:flex-start;padding:14px 20px;border-bottom:1px solid var(--bdr)}
.info-row:last-child{border-bottom:none}
.info-label{color:var(--t3);font-size:13px;font-weight:600;min-width:140px;flex-shrink:0}
.info-val{font-size:13px;font-weight:600;color:var(--t1);text-align:right;line-height:1.55;max-width:62%}
.info-val.hl{color:var(--em);text-shadow:var(--glow-sm)}
.det-sec-title{display:flex;align-items:center;gap:7px;margin:28px 0 12px;font-size:15px;font-weight:700}
.det-pc{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}

/* ── FOOTER ── */
.foot{border-top:1px solid var(--bdr2);padding:36px 0;margin-top:48px;position:relative}
.foot::before{content:'';position:absolute;top:-1px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.3),rgba(34,211,238,0.3),rgba(251,191,36,0.3),transparent)}
.foot-in{display:flex;justify-content:space-between;gap:36px;flex-wrap:wrap}
.foot-brand{max-width:260px}
.foot-brand-n{font-size:15px;font-weight:700;margin-bottom:5px;display:flex;align-items:center;gap:6px}
.foot-brand-n span{color:var(--gold);text-shadow:var(--glow-gold-sm)}
.foot-brand-d{font-size:11px;color:var(--t5);line-height:1.6}
.foot-col h4{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--em);margin-bottom:8px;text-shadow:0 0 6px rgba(6,182,212,0.15)}
.foot-col a{display:block;font-size:12px;color:var(--t4);text-decoration:none;margin-bottom:4px;cursor:pointer;transition:color .12s}
.foot-col a:hover{color:var(--em);text-shadow:0 0 8px rgba(6,182,212,0.2)}
.foot-bot{text-align:center;margin-top:24px;padding-top:14px;border-top:1px solid var(--bdr);font-size:10px;color:var(--t5)}

/* ── TOAST ── */
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#050810;font-size:12px;font-weight:700;padding:10px 24px;border-radius:8px;z-index:999;box-shadow:var(--glow-gold),0 4px 16px rgba(0,0,0,.4);animation:tI .25s ease-out,tO .25s ease-in 1.4s forwards}
@keyframes tI{from{opacity:0;transform:translateX(-50%) translateY(14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
@keyframes tO{to{opacity:0;transform:translateX(-50%) translateY(14px)}}

/* ── AUTH MODAL ── */
.auth-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px}
.auth-modal{background:var(--bg1);border:1px solid var(--bdr2);border-radius:16px;padding:32px;max-width:400px;width:100%;position:relative;box-shadow:var(--glow-box),0 20px 60px rgba(0,0,0,0.5)}
.auth-modal h2{font-size:22px;font-weight:800;margin-bottom:6px;text-align:center}
.auth-modal h2 span{color:var(--gold);text-shadow:var(--glow-gold-sm)}
.auth-modal p{color:var(--t4);font-size:13px;text-align:center;margin-bottom:20px}
.auth-close{position:absolute;top:12px;right:16px;background:none;border:none;color:var(--t4);font-size:20px;cursor:pointer}
.auth-close:hover{color:var(--em)}
.auth-input{width:100%;background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px;padding:11px 14px;color:var(--t1);font-family:var(--sans);font-size:14px;margin-bottom:10px;outline:none;transition:border-color .15s}
.auth-input:focus{border-color:var(--em);box-shadow:0 0 8px rgba(6,182,212,0.1)}
.auth-btn{width:100%;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#050810;font-family:var(--sans);font-size:14px;font-weight:700;padding:12px;border:none;border-radius:8px;cursor:pointer;margin-top:6px;box-shadow:var(--glow-gold-sm);transition:all .2s}
.auth-btn:hover{box-shadow:var(--glow-gold);transform:translateY(-1px)}
.auth-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none}
.auth-toggle{color:var(--t4);font-size:12px;text-align:center;margin-top:14px}
.auth-toggle button{background:none;border:none;color:var(--em);font-weight:700;cursor:pointer;text-decoration:underline}
.auth-err{background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,0.2);color:var(--red);font-size:12px;padding:8px 12px;border-radius:6px;margin-bottom:10px}

/* ── PULSE POINTS ── */
.pp{max-width:900px;margin:0 auto}
.pp-header{text-align:center;margin-bottom:28px}
.pp-header h2{font-size:22px;font-weight:800;margin-bottom:4px}
.pp-header h2 span{color:var(--gold);text-shadow:var(--glow-gold-sm)}
.pp-balance{display:inline-flex;align-items:center;gap:10px;background:var(--glass);border:1px solid rgba(251,191,36,0.15);border-radius:14px;padding:16px 28px;margin:16px 0}
.pp-balance-n{font-family:var(--mono);font-size:36px;font-weight:900;color:var(--gold);text-shadow:var(--glow-gold)}
.pp-balance-l{font-size:12px;color:var(--t4);font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.pp-tabs{display:flex;justify-content:center;gap:4px;margin-bottom:20px}
.pp-tab{background:var(--bg2);border:1px solid var(--bdr);color:var(--t4);font-size:12px;font-weight:600;padding:7px 16px;border-radius:7px;cursor:pointer;transition:all .15s}
.pp-tab:hover{color:var(--em);border-color:var(--bdr2)}
.pp-tab.on{background:var(--emA2);border-color:var(--bdr3);color:var(--em);text-shadow:var(--glow-sm)}
.pp-card{background:var(--glass);border:1px solid var(--bdr2);border-radius:12px;padding:20px;margin-bottom:12px;box-shadow:0 0 1px rgba(6,182,212,0.1)}
.pp-card h3{font-size:15px;font-weight:700;margin-bottom:14px;color:var(--em2);text-shadow:0 0 8px rgba(6,182,212,0.15)}
.pp-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--bdr);gap:12px}
.pp-row:last-child{border-bottom:none}
.pp-status{font-family:var(--mono);font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px;text-transform:uppercase}
.pp-status.pending{background:rgba(251,191,36,0.1);color:var(--gold)}
.pp-status.approved{background:rgba(16,185,129,0.1);color:var(--green)}
.pp-status.processing{background:rgba(34,211,238,0.1);color:var(--em)}
.pp-status.fulfilled{background:rgba(16,185,129,0.15);color:var(--green)}
.pp-status.rejected{background:rgba(255,71,87,0.1);color:var(--red)}
.pp-form label{display:block;font-size:12px;font-weight:600;color:var(--t3);margin-bottom:5px;margin-top:12px}
.pp-form select{width:100%;background:var(--bg3);border:1px solid var(--bdr2);border-radius:8px;padding:10px 14px;color:var(--t1);font-family:var(--sans);font-size:13px;outline:none;appearance:none}
.pp-form select:focus{border-color:var(--em)}
.pp-submit{background:linear-gradient(135deg,var(--em),#0891b2);color:#050810;font-family:var(--sans);font-size:13px;font-weight:700;padding:10px 24px;border:none;border-radius:8px;cursor:pointer;margin-top:16px;box-shadow:var(--glow-sm);transition:all .2s}
.pp-submit:hover{box-shadow:var(--glow);transform:translateY(-1px)}
.pp-submit:disabled{opacity:0.5;cursor:not-allowed;transform:none}
.pp-rewards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.pp-reward{background:var(--glass);border:1px solid var(--bdr2);border-radius:10px;padding:16px;text-align:center;transition:all .2s}
.pp-reward:hover{border-color:rgba(251,191,36,0.2);box-shadow:0 0 12px rgba(251,191,36,0.06)}
.pp-reward-pts{font-family:var(--mono);font-size:22px;font-weight:800;color:var(--gold);text-shadow:var(--glow-gold-sm)}
.pp-reward-name{font-size:13px;font-weight:600;margin:6px 0 10px;color:var(--t2)}
.pp-reward-btn{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#050810;font-size:11px;font-weight:700;border:none;padding:6px 16px;border-radius:6px;cursor:pointer;box-shadow:var(--glow-gold-sm);transition:all .2s}
.pp-reward-btn:hover{box-shadow:var(--glow-gold)}
.pp-reward-btn:disabled{opacity:0.4;cursor:not-allowed}
.rw-card{transition:all .3s ease;position:relative;overflow:hidden}
.rw-card:hover{transform:translateY(-6px);border-color:rgba(251,191,36,0.4) !important;box-shadow:0 0 8px rgba(251,191,36,0.5),0 0 24px rgba(251,191,36,0.35),0 0 60px rgba(251,191,36,0.2),0 0 120px rgba(251,191,36,0.1),0 0 200px rgba(251,191,36,0.05),0 20px 60px rgba(0,0,0,0.3) !important}
.rw-card.instant:hover{border-color:rgba(34,211,238,0.4) !important;box-shadow:0 0 8px rgba(34,211,238,0.5),0 0 24px rgba(34,211,238,0.35),0 0 60px rgba(34,211,238,0.2),0 0 120px rgba(34,211,238,0.1),0 0 200px rgba(34,211,238,0.05),0 20px 60px rgba(0,0,0,0.3) !important}
.rw-card.locked-bronze:hover{border-color:rgba(205,127,50,0.4) !important;box-shadow:0 0 6px rgba(205,127,50,0.4),0 0 20px rgba(205,127,50,0.25),0 0 50px rgba(205,127,50,0.12),0 0 100px rgba(205,127,50,0.06),0 16px 48px rgba(0,0,0,0.3) !important}
.rw-card.locked-silver:hover{border-color:rgba(192,192,192,0.4) !important;box-shadow:0 0 6px rgba(192,192,192,0.4),0 0 20px rgba(192,192,192,0.25),0 0 50px rgba(192,192,192,0.12),0 0 100px rgba(192,192,192,0.06),0 16px 48px rgba(0,0,0,0.3) !important}
.rw-card.locked-gold:hover{border-color:rgba(251,191,36,0.3) !important;box-shadow:0 0 6px rgba(251,191,36,0.3),0 0 20px rgba(251,191,36,0.2),0 0 50px rgba(251,191,36,0.1),0 0 100px rgba(251,191,36,0.05),0 16px 48px rgba(0,0,0,0.3) !important}
.rw-card.locked-diamond:hover{border-color:rgba(103,232,249,0.4) !important;box-shadow:0 0 6px rgba(103,232,249,0.4),0 0 20px rgba(103,232,249,0.25),0 0 50px rgba(103,232,249,0.12),0 0 100px rgba(103,232,249,0.06),0 16px 48px rgba(0,0,0,0.3) !important}
.pp-login-prompt{text-align:center;padding:40px 20px}
.pp-login-prompt h3{font-size:18px;font-weight:700;margin-bottom:8px}
.pp-login-prompt p{color:var(--t4);font-size:13px;margin-bottom:16px}
.nav-user{display:flex;align-items:center;gap:8px;margin-left:4px}
.nav-pts{font-family:var(--mono);font-size:11px;font-weight:700;color:var(--gold);text-shadow:0 0 4px rgba(251,191,36,0.3)}
.nav-avatar{width:28px;height:28px;border-radius:50%;background:var(--bg3);border:1px solid var(--bdr2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--em);cursor:pointer;transition:all .15s}
.nav-avatar:hover{border-color:var(--em);box-shadow:var(--glow-sm)}
.nav-login{font-size:12px;font-weight:600;color:var(--em);background:none;border:1px solid var(--bdr3);padding:6px 14px;border-radius:6px;cursor:pointer;transition:all .15s}
.nav-login:hover{background:var(--emA2);box-shadow:0 0 8px rgba(6,182,212,0.08)}
.panel-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:199;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
.panel{position:fixed;top:0;right:0;bottom:0;width:320px;background:#080c16;border-left:1px solid rgba(34,211,238,0.1);z-index:200;display:flex;flex-direction:column;overflow-y:auto;animation:slideIn .25s ease;box-shadow:-8px 0 40px rgba(0,0,0,0.6),-2px 0 20px rgba(6,182,212,0.05);isolation:isolate}
.panel-close{position:absolute;top:14px;right:14px;background:none;border:none;color:#94a3b8;font-size:18px;cursor:pointer;z-index:1}
.panel-close:hover{color:#22d3ee}
.panel-header{text-align:center;padding:28px 20px 20px;background:#0a0e16;border-bottom:1px solid rgba(148,163,184,0.08)}
.panel-avatar{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#22d3ee,#0891b2);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;color:#050810;margin:0 auto 10px;box-shadow:0 0 4px rgba(6,182,212,0.6),0 0 12px rgba(6,182,212,0.3)}
.panel-name{font-size:16px;font-weight:700;color:#f0f9ff}
.panel-email{font-size:11px;color:#64748b;margin-top:3px}
.panel-pts{padding:14px 16px;margin:12px 16px;background:#0e1420;border:1px solid rgba(251,191,36,0.12);border-radius:10px;cursor:pointer;transition:all .2s}
.panel-pts:hover{border-color:rgba(251,191,36,0.25);box-shadow:0 0 12px rgba(251,191,36,0.06)}
.panel-pts-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.panel-pts-label{font-size:12px;font-weight:600;color:#7dd3fc}
.panel-pts-val{font-family:var(--mono);font-size:20px;font-weight:800;color:#fbbf24;text-shadow:0 0 4px rgba(251,191,36,0.5),0 0 10px rgba(251,191,36,0.25)}
.panel-bar-bg{height:4px;background:#1b2538;border-radius:2px;overflow:hidden}
.panel-bar-fill{height:100%;background:linear-gradient(90deg,#fbbf24,#fde68a);border-radius:2px;transition:width .5s ease;box-shadow:0 0 6px rgba(251,191,36,0.3)}
.panel-pts-next{display:flex;justify-content:space-between;font-size:10px;color:#475569;margin-top:6px}
.panel-section-label{font-size:10px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:1px;padding:14px 16px 6px}
.panel-item{display:flex;align-items:center;gap:10px;width:100%;background:none;border:none;color:#bae6fd;font-family:var(--sans);font-size:13px;font-weight:500;padding:10px 16px;cursor:pointer;transition:all .12s;text-align:left}
.panel-item:hover{background:#0e1420;color:#22d3ee}
.panel-icon{font-size:16px;width:22px;text-align:center}
.panel-divider{height:1px;background:rgba(148,163,184,0.08);margin:4px 16px}
.panel-logout{color:#ff4757}
.panel-logout:hover{background:rgba(255,71,87,0.06);color:#ff4757}

/* ── MOBILE ── */
@media(max-width:768px){
  .wrap{padding:0 16px}
  .nav{padding:0 16px;gap:6px}
  .nav-tabs{display:none}
  .nav-burger{display:block}
  .hero{padding:32px 0 24px}
  .hero h1{font-size:22px}
  .hero-code{font-size:32px;letter-spacing:6px}
  .hero-row{gap:4px}
  .hero-chip{font-size:11px;padding:5px 10px}
  .hero-stats{gap:14px;flex-wrap:wrap;justify-content:center}
  .hero-stat b{font-size:18px}
  .hero-stat small{font-size:9px;letter-spacing:.3px}
  .lb-hdr{display:none}
  .lb-row{grid-template-columns:24px 30px 1fr 110px;gap:8px;padding:10px 14px}
  .lb-rating,.lb-trend,.lb-deal{display:none}
  .cards{grid-template-columns:1fr}
  .fcard-grid{grid-template-columns:1fr 1fr}
  .ctabs{overflow-x:auto;-webkit-overflow-scrolling:touch;justify-content:flex-start;gap:0;padding:0 2px;margin-bottom:20px}
  .ctab{white-space:nowrap;flex-shrink:0;padding:10px 13px;font-size:12.5px}
  .filters{justify-content:center !important}
  .f-btn{font-size:11px;padding:5px 11px}
  .det-pc{grid-template-columns:1fr}
  .blog-grid{grid-template-columns:1fr}
  .foot-in{flex-direction:column;gap:20px}
  .offer-row{flex-wrap:wrap;gap:12px}
  .offer-pct{min-width:70px;font-size:16px}
  .pp-rewards{grid-template-columns:1fr 1fr}
  .pp-balance-n{font-size:28px}
  .pp-hdr-grid{grid-template-columns:1fr !important}
  .auth-modal{margin:16px;padding:24px}
  .nav-login{display:none}
  .panel{width:100%}
}
@media(max-width:420px){
  .hero h1{font-size:19px}
  .hero-code{font-size:26px;letter-spacing:5px}
  .hero-stats{gap:10px}
  .hero-stat b{font-size:16px}
  .lb-row{grid-template-columns:22px 1fr 90px;gap:6px}
  .lb-logo{display:none}
  .det-name{font-size:22px}
  .fcard{padding:18px}
  .cards{grid-template-columns:1fr}
  .ctab{padding:9px 10px;font-size:11px}
  .f-btn{font-size:10px;padding:4px 9px}
}

`;

// ── HELPERS ──
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

// ── COMPONENTS ────────────────────────────────────────────────────────────────


const FirmLogo = ({f,size=32}) => {
  const logo = LOGOS[f.name];
  const r = size>36?9:7;
  return (
    <div style={{width:size,height:size,borderRadius:r,overflow:'hidden',background:'var(--bg3)',border:'1px solid var(--bdr)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
      {logo ? <img src={logo} alt={f.name} style={{width:'100%',height:'100%',objectFit:'contain',padding:3,borderRadius:r-1}}/> : <div style={{fontSize:size>36?11:9,fontWeight:800,color:'#fff',background:f.brandGrad,width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:r-1}}>{f.initials}</div>}
    </div>
  );
};

const Ticker = () => {
  const items = [...DEALS,...DEALS,...DEALS];
  return (
    <div className="ticker"><div className="ticker-track">
      {items.map((d,i)=><span key={i} className="tick"><span className="tick-name">{d.firm}</span><b>{d.pct}</b><span style={{color:'var(--t5)'}}>|</span></span>)}
    </div></div>
  );
};

const NavBar = ({tab,setTab,setPage,user,onLogin,onLogout}) => {
  const [mob,setMob] = useState(false);
  const [copied,setCopied] = useState(false);
  const [showProfile,setShowProfile] = useState(false);
  const [userPts,setUserPts] = useState(0);
  const [changingPw,setChangingPw] = useState(false);
  const [newPw,setNewPw] = useState("");
  const [pwMsg,setPwMsg] = useState("");
  const tabs = [["firms","Firms"],["challenges","Challenges"],["offers","Offers"],["giveaways","Giveaway"],["blog","Research"],["points","\u2B50 Pulse Points"]];
  const go = k => {setPage("home");setTab(k);setMob(false);document.body.style.overflow='';setShowProfile(false);};
  const copyPulse = () => {copyToClipboard("PULSE");setCopied(true);setTimeout(()=>setCopied(false),1800);};

  useEffect(()=>{
    if(!user) return;
    supabase.from("profiles").select("points").eq("id",user.id).single().then(({data})=>{if(data)setUserPts(data.points||0)});
  },[user,tab]);

  const handleChangePw = async ()=>{
    if(newPw.length<6){setPwMsg("Min 6 characters");return;}
    setPwMsg("Updating...");
    const {error}=await supabase.auth.updateUser({password:newPw});
    if(error) setPwMsg(error.message);
    else{setPwMsg("Password updated!");setNewPw("");setTimeout(()=>{setChangingPw(false);setPwMsg("")},1500);}
  };

  return (<>
    <nav className="nav">
      <div className="nav-logo" onClick={()=>go("firms")}>
        <img src={LOGO_URL} alt="P" style={{width:28,height:28,borderRadius:6}} onError={e=>{e.target.style.display='none'}}/>
        <span className="nav-logo-text">The<span>PropPulse</span></span>
      </div>
      <div className="nav-tabs">
        {tabs.map(([k,l])=><button key={k} className={`nav-tab${tab===k?' on':''}`} onClick={()=>go(k)}>{l}</button>)}
      </div>
      <button className="nav-code" onClick={copyPulse}>{copied?'\u2713 Copied!':'PULSE'}</button>
      {user?<div className="nav-user">
        <div className="nav-avatar" onClick={()=>setShowProfile(p=>!p)}>{(user.email||"U")[0].toUpperCase()}</div>
      </div>
      :<button className="nav-login" onClick={onLogin}>Sign In</button>}
      <button className="nav-burger" onClick={()=>{setMob(p=>{document.body.style.overflow=!p?'hidden':'';return !p;})}}>{mob?'\u2715':'\u2261'}</button>
    </nav>
    {showProfile&&user&&<>
      <div className="panel-overlay" onClick={()=>{setShowProfile(false);setChangingPw(false)}}/>
      <div className="panel">
        <button className="panel-close" onClick={()=>setShowProfile(false)}>{'\u2715'}</button>
        <div className="panel-header">
          <div className="panel-avatar">{(user.email||"U")[0].toUpperCase()}</div>
          <div className="panel-name">{String(user.user_metadata?.display_name||user.email||"Trader")}</div>
          <div className="panel-email">{String(user.email||"")}</div>
        </div>
        <div className="panel-pts" onClick={()=>go("points")}>
          <div className="panel-pts-top">
            <span className="panel-pts-label">Pulse Points</span>
            <span className="panel-pts-val">{userPts.toLocaleString()}</span>
          </div>
          <div className="panel-bar-bg">
            <div className="panel-bar-fill" style={{width:Math.min(100,(userPts/10000)*100)+'%'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#475569',marginTop:6}}>
            <span>{userPts>=10000?'Ready to claim!':Math.max(0,10000-userPts).toLocaleString()+' pts to next reward'}</span>
            <span style={{color:'#fbbf24'}}>Free 25K (10,000)</span>
          </div>
        </div>
        <div className="panel-section-label">Pulse Points</div>
        <button className="panel-item" onClick={()=>go("points")}><span className="panel-icon">{'\u2B50'}</span><span>My Dashboard</span></button>
        <button className="panel-item" onClick={()=>go("points")}><span className="panel-icon">{'\u{1F4E4}'}</span><span>Submit Purchase</span></button>
        <button className="panel-item" onClick={()=>go("points")}><span className="panel-icon">{'\u{1F381}'}</span><span>Rewards Store</span></button>
        <button className="panel-item" onClick={()=>go("points")}><span className="panel-icon">{'\u{1F4DC}'}</span><span>Points History</span></button>
        <div className="panel-section-label">Account</div>
        <button className="panel-item" onClick={()=>setChangingPw(p=>!p)}><span className="panel-icon">{'\u{1F512}'}</span><span>Change Password</span></button>
        {changingPw&&<div style={{padding:'0 16px 12px'}}>
          <input className="auth-input" type="password" placeholder="New password (min 6 chars)" value={newPw} onChange={e=>setNewPw(e.target.value)} style={{marginBottom:6,fontSize:12}}/>
          {pwMsg&&<div style={{fontSize:11,color:pwMsg.includes("updated")?'#10b981':'#ff4757',marginBottom:6}}>{pwMsg}</div>}
          <button className="pp-submit" style={{padding:'6px 14px',fontSize:11,marginTop:0,width:'100%'}} onClick={handleChangePw}>Update Password</button>
        </div>}
        <div style={{flex:1}}/>
        <div className="panel-divider"/>
        <button className="panel-item panel-logout" onClick={()=>{setShowProfile(false);onLogout();}}><span className="panel-icon">{'\u274C'}</span><span>Sign Out</span></button>
        <div style={{height:16}}/>
      </div>
    </>}
    {mob&&<div className="mob-menu">{tabs.map(([k,l])=><button key={k} className={tab===k?'on':''} onClick={()=>go(k)}>{l}</button>)}</div>}
    {copied&&<div className="toast">PULSE code copied to clipboard!</div>}
  </>);
};

// ── PULSE LEADERBOARD ──
const PulseLeaderboard = ({firms,onSelect}) => {
  const [copied,setCopied] = useState(null);
  return (<div className="lb">
    <div className="lb-hdr"><span>#</span><span></span><span>Firm</span><span>Pulse Score</span><span>Rating</span><span>Trend</span><span>Deal</span></div>
    {firms.map((f,i)=>{
      const ps=calcPulse(f.rating,f.reviews,f.name);
      const deal=DEALS.find(d=>d.firm===f.name);
      return (<div key={f.id} className="lb-row" onClick={()=>onSelect(f)}>
        <div className="lb-rank">{String(i+1).padStart(2,'0')}</div>
        <div className="lb-logo"><FirmLogo f={f} size={32}/></div>
        <div className="lb-name-c">
          <div className="lb-name">{f.name}{TOP_PICKS.has(f.name)&&<span className="tp">{'\u2605'}</span>}</div>
          <div className="lb-sub">{f.flag} {f.hq} · {f.maxAlloc}</div>
        </div>
        <div className="lb-bar-c">
          <div className="lb-bar-bg"><div className="lb-bar-fill" style={{width:(ps/100*100)+"%"}}/></div>
          <div className="lb-score">{ps}</div>
        </div>
        <div className="lb-rating" style={{color:f.rating>=4.7?'var(--green)':f.rating>=4?'var(--blue2)':'var(--t3)'}}>{f.rating>0?f.rating:'\u2014'}</div>
        <div className="lb-trend" style={{color:f.trend==='up'?'var(--green)':f.trend==='down'?'var(--red)':f.trend==='new'?'var(--cyan)':'var(--t4)'}}>{f.trend==='up'?'\u25B2':f.trend==='down'?'\u25BC':f.trend==='new'?'NEW':'\u2013'}</div>
        {deal?<div className="lb-deal" onClick={e=>{e.stopPropagation();copyToClipboard(deal.code);setCopied(f.id);setTimeout(()=>setCopied(null),1400)}}>{deal.pct}</div>:<div className="lb-deal-na">\u2014</div>}
      </div>);
    })}
    {copied!==null&&<div className="toast">PULSE code copied</div>}
  </div>);
};

// ── FIRM CARDS ──
const FirmCards = ({firms,onSelect,user}) => (
  <div className="cards">{firms.map(f=>{
    const ps=calcPulse(f.rating,f.reviews,f.name);
    const deal=DEALS.find(d=>d.firm===f.name);
    const hasAff=!!AFFILIATE_LINKS[f.name];
    return (<div key={f.id} className="fcard" style={{'--card-accent':f.color,'--card-glow':f.color+'20'}}>
      <div className="fcard-top" onClick={()=>onSelect(f)} style={{cursor:'pointer'}}>
        <div className="fcard-logo"><FirmLogo f={f} size={42}/></div>
        <div className="fcard-info">
          <div className="fcard-name">{f.name}{TOP_PICKS.has(f.name)&&<span className="tp">{'\u2605'}</span>}</div>
          <div className="fcard-sub">{f.flag} {f.hq} · Est. {f.founded}</div>
        </div>
        {deal&&<span className="fcard-deal">{deal.pct}</span>}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}} onClick={()=>onSelect(f)}>
        <span style={{fontFamily:'var(--mono)',fontSize:13,fontWeight:800,color:f.color,textShadow:'0 0 8px '+f.color+'60'}}>{f.rating}</span>
        <span style={{color:'#facc15',fontSize:12,textShadow:'0 0 6px rgba(250,204,21,0.3)'}}>{'★'.repeat(Math.floor(f.rating))}</span>
        <span style={{fontSize:11,color:'var(--t4)'}}>{f.reviews>0?f.reviews.toLocaleString()+' reviews':'New'}</span>
      </div>
      <div className="fcard-desc" onClick={()=>onSelect(f)}>{f.desc}</div>
      <div className="fcard-grid">
        <div className="fcard-stat"><div className="fcard-sl">Max Alloc</div><div className="fcard-sv" style={{color:f.color,textShadow:'0 0 8px '+f.color+'40'}}>{f.maxAlloc}</div></div>
        <div className="fcard-stat"><div className="fcard-sl">Split</div><div className="fcard-sv">{f.split.split('\u2192')[0].trim()}</div></div>
        <div className="fcard-stat"><div className="fcard-sl">Payout</div><div className="fcard-sv">{f.paySpeed}</div></div>
      </div>
      <div className="fcard-foot">
        <div className="fcard-pulse">
          <span className="fcard-pl">Pulse</span>
          <span className="fcard-pv" style={{color:pulseColor(ps)}}>{ps}</span>
        </div>
        <div style={{display:'flex',gap:6}}>
          {hasAff&&<button className="fcard-btn" style={{background:'linear-gradient(135deg,#fbbf24,#f59e0b)',borderColor:'transparent',color:'#050810',fontWeight:700}} onClick={e=>{e.stopPropagation();trackClick(f.name,user?.id)}}>Get Deal</button>}
          <button className="fcard-btn" style={{background:f.color+'15',borderColor:f.color+'30',color:f.color}} onClick={()=>onSelect(f)}>View Details</button>
        </div>
      </div>
    </div>);
  })}</div>
);

// ── FIRM TABLE ──
const FirmTable = ({firms,onSelect}) => {
  const [copied,setCopied]=useState(false);
  return (<>
    <div className="tbl-wrap"><table className="tbl"><thead><tr>
      <th>Firm</th><th>Pulse</th><th>Rating</th><th>Country</th><th>Platforms</th><th>Max Alloc</th><th>Deal</th><th></th>
    </tr></thead><tbody>{firms.map(f=>{
      const ps=calcPulse(f.rating,f.reviews,f.name);
      const deal=DEALS.find(d=>d.firm===f.name);
      return (<tr key={f.id} onClick={()=>onSelect(f)}>
        <td><div style={{display:'flex',alignItems:'center',gap:10}}><FirmLogo f={f} size={34}/><div><div style={{fontWeight:700,fontSize:13}}>{f.name}{TOP_PICKS.has(f.name)&&<span className="tp" style={{marginLeft:3}}>{'\u2605'}</span>}</div><div style={{fontSize:10,color:'var(--t4)'}}>{f.hq} · Est. {f.founded}</div></div></div></td>
        <td><span className="mono" style={{fontWeight:800,color:pulseColor(ps)}}>{ps}</span></td>
        <td><span style={{fontWeight:700,color:f.rating>=4.5?'var(--green)':'var(--t2)'}}>{f.rating>0?f.rating:'\u2014'}</span><span style={{fontSize:10,color:'var(--t4)',marginLeft:4}}>{f.reviews.toLocaleString()}</span></td>
        <td>{f.flag} {f.country}</td>
        <td style={{fontSize:10}}>{f.platforms.slice(0,3).join(', ')}</td>
        <td><span className="mono" style={{fontWeight:700}}>{f.maxAlloc}</span></td>
        <td>{deal?<span className="lb-deal" onClick={e=>{e.stopPropagation();copyToClipboard(deal.code);setCopied(true);setTimeout(()=>setCopied(false),1400)}}>{deal.pct}</span>:<span style={{color:'var(--t5)',fontSize:10}}>\u2014</span>}</td>
        <td><button className="fcard-btn" onClick={e=>{e.stopPropagation();onSelect(f)}}>View</button></td>
      </tr>);
    })}</tbody></table></div>
    {copied&&<div className="toast">PULSE code copied</div>}
  </>);
};

// ── CHALLENGES TAB ──
const ChallengesTab = () => {
  const [filters,setFilters]=useState({instant:false,noDLL:false,noConsistency:false,newsOk:false,eaOk:false,size:"50K"});
  const toggle=k=>setFilters(p=>({...p,[k]:!p[k]}));
  const setSize=v=>setFilters(p=>({...p,size:p.size===v?"":v}));
  const allSizes=[...new Set(CHALLENGES.map(c=>c.size))].sort((a,b)=>parseInt(a)-parseInt(b));
  const filtered=useMemo(()=>{
    const hs=filters.instant;
    return CHALLENGES.filter(c=>{
      if(!hs&&!c.standard)return false;
      if(filters.instant&&!c.instant)return false;
      if(filters.noDLL&&c.dll!=="None"&&!c.dll.includes("None"))return false;
      if(filters.noConsistency&&c.consistency!=="None")return false;
      if(filters.newsOk&&!c.news)return false;
      if(filters.eaOk&&!c.ea)return false;
      if(filters.size&&c.size!==filters.size)return false;
      return true;
    });
  },[filters]);
  const ac=Object.values(filters).filter(v=>v===true||(typeof v==="string"&&v!=="")).length;
  return (<div>
    <div className="sec-hdr"><div><div className="sec-title">Challenge Comparison Tool</div><div className="sec-sub">Filter {CHALLENGES.length} challenges across {new Set(CHALLENGES.map(c=>c.firm)).size} firms</div></div>
      {ac>0&&<button className="f-btn" style={{fontSize:10}} onClick={()=>setFilters({instant:false,noDLL:false,noConsistency:false,newsOk:false,eaOk:false,size:""})}>Clear all</button>}
    </div>
    <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:6}}>
      <button className={`f-btn ${filters.instant?"on":""}`} onClick={()=>toggle("instant")}>Instant Funding</button>
      <button className={`f-btn ${filters.noDLL?"on":""}`} onClick={()=>toggle("noDLL")}>No Daily Loss Limit</button>
      <button className={`f-btn ${filters.noConsistency?"on":""}`} onClick={()=>toggle("noConsistency")}>No Consistency Rule</button>
      <button className={`f-btn ${filters.newsOk?"on":""}`} onClick={()=>toggle("newsOk")}>News Trading OK</button>
      <button className={`f-btn ${filters.eaOk?"on":""}`} onClick={()=>toggle("eaOk")}>EAs/Bots OK</button>
    </div>
    <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:12,alignItems:'center'}}>
      <span style={{fontSize:10,color:'var(--t4)',fontWeight:700,marginRight:2}}>SIZE:</span>
      {allSizes.map(s=><button key={s} className={`f-btn ${filters.size===s?"on":""}`} onClick={()=>setSize(s)} style={{padding:'3px 8px',fontSize:10}}>${s}</button>)}
    </div>
    <div style={{fontSize:11,color:'var(--t3)',marginBottom:8}}>Showing <b style={{color:'var(--t1)'}}>{filtered.length}</b> challenges</div>
    <div className="ch-wrap"><table className="tbl" style={{minWidth:1100}}><thead><tr>
      <th>Firm</th><th>Plan</th><th>Size</th><th>Price</th><th>Target</th><th>Max Loss</th><th>DLL</th><th>Drawdown</th><th>Min Days</th><th>Split</th><th>Payout</th><th>Consistency</th><th>News</th><th>EAs</th>
    </tr></thead><tbody>{filtered.length===0?<tr><td colSpan={14} style={{textAlign:'center',padding:32,color:'var(--t4)'}}>No matches. Try fewer filters.</td></tr>:filtered.map((c,i)=>{
      const f=FIRMS.find(ff=>ff.name===c.firm);
      return (<tr key={i}>
        <td><div style={{display:'flex',alignItems:'center',gap:8}}>{f&&<FirmLogo f={f} size={26}/>}<span style={{fontWeight:700,color:'var(--t1)'}}>{c.firm}</span></div></td>
        <td style={{fontWeight:600}}>{c.plan}{c.instant&&<span style={{color:'var(--cyan)',marginLeft:4,fontSize:10}}>INSTANT</span>}</td>
        <td className="mono" style={{color:'var(--cyan)'}}>${c.size}</td>
        <td style={{fontWeight:600}}>{c.price}</td>
        <td className="mono">{c.target}</td>
        <td className="mono">{c.maxLoss}</td>
        <td>{c.dll==="None"||c.dll.includes("None")?<span className="good">None</span>:<span className="warn">{c.dll}</span>}</td>
        <td>{c.drawdown}</td>
        <td>{c.minDays==="None"?<span className="good">None</span>:c.minDays}</td>
        <td>{c.split}</td>
        <td>{c.payout}</td>
        <td>{c.consistency==="None"?<span className="good">None</span>:<span className="warn">{c.consistency}</span>}</td>
        <td>{c.news?<span className="good">{'\u2713'}</span>:<span style={{color:'var(--red)'}}>{'\u2717'}</span>}</td>
        <td>{c.ea?<span className="good">{'\u2713'}</span>:<span style={{color:'var(--red)'}}>{'\u2717'}</span>}</td>
      </tr>);
    })}</tbody></table></div>
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
      return (<div key={i} className="offer-row" style={{borderLeft:'3px solid '+(f?f.color:'var(--em)'),'--card-accent':f?f.color:'var(--em)'}}>
        {f&&<FirmLogo f={f} size={34}/>}
        <div className="offer-pct">{d.pct}</div>
        <div className="offer-info">
          <div className="offer-firm">{d.firm}{d.tag&&<span className="offer-tag">{d.tag}</span>}</div>
          <div className="offer-desc">{d.desc}{d.expires&&<span style={{color:'var(--amber)',marginLeft:4}}>Ends {d.expires}</span>}</div>
        </div>
        <div className="offer-code" onClick={()=>{copyToClipboard(d.code);setCopied(i);setTimeout(()=>setCopied(null),1400)}}>{copied===i?'\u2713 Copied':d.code}</div>
        {hasAff&&<button style={{background:'linear-gradient(135deg,#fbbf24,#f59e0b)',border:'none',color:'#050810',fontFamily:'var(--sans)',fontSize:12,fontWeight:700,padding:'8px 16px',borderRadius:6,cursor:'pointer',whiteSpace:'nowrap',boxShadow:'var(--glow-gold-sm)'}} onClick={()=>trackClick(d.firm,user?.id)}>Get Deal</button>}
      </div>);
    })}</div>
    {copied!==null&&<div className="toast">Code copied</div>}
  </div>);
};

// ── GIVEAWAY TAB ──
const GiveawaysTab = () => (
  <div style={{maxWidth:620,margin:'0 auto'}}>
    <div className="sec-hdr"><div><div className="sec-title">Weekly Giveaway</div><div className="sec-sub">Buy with code PULSE for automatic entry</div></div></div>
    <div className="gw-prize">
      <div style={{fontSize:10,fontWeight:700,color:'var(--cyan)',textTransform:'uppercase',letterSpacing:1.5}}>This Week's Prize</div>
      <div style={{fontSize:18,fontWeight:800,marginTop:6}}>Free 150K Funded Account</div>
      <div className="gw-val">$150K</div>
      <div style={{fontSize:11,color:'var(--t3)'}}>Winner announced Friday at 5PM EST on Discord & YouTube</div>
    </div>
    <div className="gw-steps">
      {[["01","Purchase Any Account","From any listed firm"],["02","Use Code PULSE","Get your discount + qualify"],["03","Submit Proof","Screenshot of order"],["04","Win","Drawn every Friday"]].map(([n,t,d])=>(
        <div key={n} className="gw-step"><div className="gw-step-n">{n}</div><div className="gw-step-t">{t}</div><div className="gw-step-d">{d}</div></div>
      ))}
    </div>
    <div style={{textAlign:'center',margin:'24px 0'}}>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSeBd3EkO_rPjqMC2f7G9Z2S7dPquxJtnBCkXpKHsAULHavfXQ/viewform" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
        <button className="gw-btn">Submit Your Entry</button>
      </a>
    </div>
    <div className="gw-rules"><h4>Rules</h4><ul>
      {["Purchase through a listed firm","Code PULSE applied at checkout","One entry per purchase — more purchases = more entries","Screenshot must show discount code","Winners drawn every Friday, announced on Discord & YouTube","Entries Mon\u2013Sun eligible for that week's drawing"].map((r,i)=><li key={i}>{r}</li>)}
    </ul></div>
  </div>
);

// ── BLOG TAB ──
const BlogTab = ({onSelect}) => {
  const catColor = c => ({Industry:'#a855f7',Comparison:'#0ea5e9',Strategy:'#06b6d4',News:'#06b6d4',Guide:'#ffbe0b',Education:'#ff6b6b'}[c]||'#06b6d4');
  return (
  <div>
    <div className="sec-hdr"><div><div className="sec-title">Research & Analysis</div><div className="sec-sub">Data-driven insights for prop traders</div></div></div>
    <div className="blog-grid">{BLOG.map(p=>{
      const cc = catColor(p.cat);
      return (
      <div key={p.id} className="blog-card" style={{'--card-accent':cc,'--card-glow':cc+'20',borderLeft:'3px solid '+cc}} onClick={()=>onSelect(p)}>
        <div className="blog-cat" style={{color:cc,textShadow:'0 0 8px '+cc+'50'}}>{p.cat}</div>
        <div className="blog-title">{p.title}</div>
        <div className="blog-excerpt">{p.excerpt}</div>
        <div className="blog-date">{p.date} · {p.time} read</div>
      </div>);
    })}</div>
  </div>);
};

// ── BLOG POST PAGE ──
const BlogPostPage = ({post,goBack}) => {
  if(!post) return null;
  const paras = post.body.split("\n\n");
  return (<div className="wrap" style={{maxWidth:700,margin:'0 auto'}}>
    <button className="det-back" onClick={goBack}>{'\u2190'} Back to Research</button>
    <div style={{marginTop:8}}>
      <div className="blog-cat" style={{marginBottom:10,display:'inline-block'}}>{post.cat}</div>
      <h1 style={{fontFamily:'var(--sans)',fontSize:28,fontWeight:800,lineHeight:1.3,margin:'8px 0 12px',letterSpacing:'-.3px'}}>{post.title}</h1>
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
      <div style={{marginTop:32,padding:20,background:'var(--bg1)',border:'1px solid var(--bdr2)',borderRadius:12,textAlign:'center'}}>
        <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>Ready to get funded?</div>
        <div style={{fontSize:12,color:'var(--t3)',marginBottom:12}}>Use code <b style={{color:'var(--cyan)',fontFamily:'var(--mono)'}}>PULSE</b> at any firm for an exclusive discount.</div>
        <button className="gw-btn" style={{fontSize:13,padding:'10px 24px'}} onClick={goBack}>Compare All Firms</button>
      </div>
    </div>
  </div>);
};

// ── DETAIL PAGE ──
const DetailPage = ({firm,goBack}) => {
  const [copied,setCopied]=useState(false);
  if(!firm) return null;
  const deal=DEALS.find(d=>d.firm===firm.name);
  const profile=FIRM_PROFILES[firm.name];
  const firmCh=CHALLENGES.filter(c=>c.firm===firm.name);
  const ps=calcPulse(firm.rating,firm.reviews,firm.name);

  const fc = firm.color || 'var(--em)';
  const SectionTitle=({icon,children})=>(<div className="det-sec-title"><span style={{fontSize:16}}>{icon}</span><span style={{color:fc,textShadow:'0 0 8px '+fc+'40'}}>{children}</span></div>);
  const InfoRow=({label,value,highlight})=>(<div className="info-row"><span className="info-label">{label}</span><span className={`info-val${highlight?' hl':''}`} style={highlight?{color:fc,textShadow:'0 0 6px '+fc+'30'}:{}}>{value}</span></div>);

  return (<div className="wrap det">
    <button className="det-back" onClick={goBack}>{'\u2190'} Back to All Firms</button>
    <div className="det-hero">
      <FirmLogo f={firm} size={56}/>
      <div style={{flex:1}}>
        <div className="det-name" style={{color:fc,textShadow:'0 0 12px '+fc+'30'}}>{firm.name}{TOP_PICKS.has(firm.name)&&<span className="tp" style={{marginLeft:6,fontSize:12}}>{'\u2605'}</span>}</div>
        <div className="det-sub">{firm.flag} {firm.hq} · Est. {firm.founded}{profile&&<> · <a href={'https://'+profile.website} target="_blank" rel="noopener" style={{color:fc}}>{profile.website}</a></>}</div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginTop:8,flexWrap:'wrap'}}>
          <div className="det-pulse-badge" style={{borderColor:fc+'30'}}><span className="det-pulse-lbl">Pulse</span><span className="det-pulse-v" style={{color:pulseColor(ps)}}>{ps}</span></div>
          <span style={{fontFamily:'var(--mono)',fontSize:13,fontWeight:800,color:fc,textShadow:'0 0 8px '+fc+'50'}}>{firm.rating>0?firm.rating:'\u2014'}</span>
          <span style={{color:'#facc15',fontSize:12,textShadow:'0 0 6px rgba(250,204,21,0.3)'}}>{'★'.repeat(Math.floor(firm.rating))}</span>
          <span style={{fontSize:11,color:'var(--t4)'}}>{firm.reviews.toLocaleString()} reviews</span>
        </div>
      </div>
    </div>

    {deal&&<div className="det-deal" style={{borderLeft:'3px solid '+fc}}>
      <span style={{fontFamily:'var(--mono)',fontSize:18,fontWeight:800,color:'var(--gold)',textShadow:'var(--glow-gold)'}}>{deal.pct}</span>
      <div><span style={{color:'var(--t3)',fontSize:12}}>Code </span><b style={{fontFamily:'var(--mono)',fontSize:14,color:fc}}>{deal.code}</b></div>
      <div style={{display:'flex',gap:6,marginLeft:'auto'}}>
        <button className="fcard-btn" style={{background:fc+'15',borderColor:fc+'30',color:fc}} onClick={()=>{copyToClipboard(deal.code);setCopied(true);setTimeout(()=>setCopied(false),1500)}}>{copied?'\u2713 Copied':'Copy Code'}</button>
        {AFFILIATE_LINKS[firm.name]&&<button className="fcard-btn" style={{background:'linear-gradient(135deg,#fbbf24,#f59e0b)',borderColor:'transparent',color:'#050810',fontWeight:700}} onClick={()=>trackClick(firm.name)}>Get This Deal {'\u2192'}</button>}
      </div>
    </div>}

    {profile?<>
      <div className="det-desc" style={{marginBottom:20,borderLeft:'3px solid '+fc}}>
        <div style={{fontFamily:'var(--sans)',fontStyle:'italic',color:fc,fontSize:14,marginBottom:6,textShadow:'0 0 8px '+fc+'30'}}>"{profile.tagline}"</div>
        {profile.description}
      </div>

      <SectionTitle icon="📊">Quick Stats</SectionTitle>
      <div className="det-grid">
        {[["Account Sizes",profile.accountSizes],["Max Allocation",firm.maxAlloc],["Total Payouts",profile.totalPayouts],["Plans",profile.plans.join(", ")],["Platforms",profile.platforms.slice(0,4).join(", ")],["Founded",firm.founded+" · "+firm.hq]].map(([l,v],idx)=>(
          <div className="det-stat" key={l} style={{borderTop:'2px solid '+(idx===0?fc:idx===1?'var(--gold)':idx===2?'var(--em)':'var(--bdr)')}}><div className="det-stat-l" style={idx<3?{color:fc}:{}}>{l}</div><div className="det-stat-v">{v}</div></div>
        ))}
      </div>

      <SectionTitle icon="💰">Payout Structure</SectionTitle>
      <div className="det-section" style={{borderLeft:'3px solid '+fc}}>
        <InfoRow label="Profit Split" value={profile.profitSplit} highlight/>
        <InfoRow label="Payout Speed" value={profile.payoutSpeed}/>
        <InfoRow label="Payout Frequency" value={profile.payoutFreq}/>
        <InfoRow label="Activation Fee" value={profile.activationFee}/>
        <InfoRow label="Path to Live" value={profile.livePath}/>
      </div>

      {firmCh.length>0&&<>
        <SectionTitle icon="🏆">Challenge Plans & Pricing</SectionTitle>
        <div className="ch-wrap"><table className="tbl" style={{minWidth:800}}><thead><tr>
          <th>Plan</th><th>Size</th><th>Price</th><th>Target</th><th>Max Loss</th><th>DLL</th><th>Consistency</th><th>Split</th><th>Payout</th>
        </tr></thead><tbody>{firmCh.map((c,i)=>(
          <tr key={i}>
            <td style={{fontWeight:600}}>{c.plan}{c.instant&&<span style={{color:'var(--cyan)',marginLeft:3}}>INSTANT</span>}</td>
            <td className="mono" style={{color:'var(--cyan)'}}>${c.size}</td>
            <td style={{fontWeight:600}}>{c.price}</td>
            <td className="mono">{c.target}</td>
            <td className="mono">{c.maxLoss}</td>
            <td>{c.dll==="None"?<span className="good">None</span>:<span className="warn">{c.dll}</span>}</td>
            <td>{c.consistency==="None"?<span className="good">None</span>:<span className="warn">{c.consistency}</span>}</td>
            <td>{c.split}</td>
            <td>{c.payout}</td>
          </tr>
        ))}</tbody></table></div>
      </>}

      <SectionTitle icon="📋">Trading Rules</SectionTitle>
      <div className="det-section" style={{borderLeft:'3px solid '+fc}}>
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

      <div className="det-pc">
        <div style={{background:'var(--bg1)',border:'1px solid var(--bdr)',borderRadius:10,padding:16,borderTop:'2px solid var(--green)'}}>
          <h4 style={{color:'var(--green)',fontSize:13,fontWeight:700,marginBottom:8,textShadow:'0 0 8px rgba(16,185,129,0.3)'}}>Pros</h4>
          {profile.pros.map((p,i)=><div key={i} style={{fontSize:12,color:'var(--t2)',padding:'4px 0',paddingLeft:16,position:'relative'}}><span style={{position:'absolute',left:0,color:'var(--green)',textShadow:'0 0 4px rgba(16,185,129,0.4)'}}>+</span>{p}</div>)}
        </div>
        <div style={{background:'var(--bg1)',border:'1px solid var(--bdr)',borderRadius:10,padding:16,borderTop:'2px solid var(--amber)'}}>
          <h4 style={{color:'var(--amber)',fontSize:13,fontWeight:700,marginBottom:8,textShadow:'0 0 8px rgba(255,190,11,0.3)'}}>Considerations</h4>
          {profile.cons.map((c,i)=><div key={i} style={{fontSize:12,color:'var(--t2)',padding:'4px 0',paddingLeft:16,position:'relative'}}><span style={{position:'absolute',left:0,color:'var(--amber)',textShadow:'0 0 4px rgba(255,190,11,0.4)'}}>–</span>{c}</div>)}
        </div>
      </div>
    </>:<div className="det-desc">{firm.desc}</div>}
  </div>);
};

// ── FOOTER ──
const Footer = ({setPage,setTab}) => (
  <footer className="foot"><div className="wrap"><div className="foot-in">
    <div className="foot-brand"><div className="foot-brand-n">The<span>PropPulse</span></div><div className="foot-brand-d">Your futures prop firm command center. Compare, track, and find the right firm.</div></div>
    <div className="foot-col"><h4>Platform</h4><a onClick={()=>{setPage("home");setTab("firms")}}>Firms</a><a onClick={()=>{setPage("home");setTab("challenges")}}>Challenges</a><a onClick={()=>{setPage("home");setTab("offers")}}>Offers</a><a onClick={()=>{setPage("home");setTab("giveaways")}}>Giveaway</a><a onClick={()=>{setPage("home");setTab("points")}}>Pulse Points</a></div>
    <div className="foot-col"><h4>Resources</h4><a onClick={()=>{setPage("home");setTab("blog")}}>Research</a><a>Education</a><a>FAQ</a></div>
    <div className="foot-col"><h4>Company</h4><a>About</a><a>Contact</a><a>Privacy</a><a>Terms</a></div>
  </div><div className="foot-bot">© 2026 ThePropPulse.com — Not financial advice. Data for informational purposes only.</div></div></footer>
);

// ── AUTH MODAL ──
const AuthModal = ({onClose,onAuth}) => {
  const [mode,setMode]=useState("login");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [name,setName]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSubmit = async () => {
    setErr("");setLoading(true);
    try {
      if(mode==="signup"){
        const {data,error}=await supabase.auth.signUp({email,password:pass,options:{data:{display_name:name}}});
        if(error) throw error;
        if(data.user){
          await supabase.from("profiles").update({display_name:name}).eq("id",data.user.id);
          onAuth(data.user);onClose();
        }
      } else {
        const {data,error}=await supabase.auth.signInWithPassword({email,password:pass});
        if(error) throw error;
        onAuth(data.user);onClose();
      }
    } catch(e){setErr(e.message)}
    setLoading(false);
  };

  return (<div className="auth-overlay" onClick={onClose}>
    <div className="auth-modal" onClick={e=>e.stopPropagation()}>
      <button className="auth-close" onClick={onClose}>{'\u2715'}</button>
      <h2>{mode==="login"?"Welcome Back":"Join"} <span>Pulse Points</span></h2>
      <p>{mode==="login"?"Sign in to track your points":"Sign up and start earning free accounts"}</p>
      {err&&<div className="auth-err">{err}</div>}
      {mode==="signup"&&<input className="auth-input" placeholder="Display name" value={name} onChange={e=>setName(e.target.value)}/>}
      <input className="auth-input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="auth-input" type="password" placeholder="Password" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/>
      <button className="auth-btn" onClick={handleSubmit} disabled={loading}>{loading?"Loading...":mode==="login"?"Sign In":"Create Account"}</button>
      <div className="auth-toggle">
        {mode==="login"?<>Don't have an account? <button onClick={()=>{setMode("signup");setErr("")}}>Sign up</button></>
        :<>Already have an account? <button onClick={()=>{setMode("login");setErr("")}}>Sign in</button></>}
      </div>
    </div>
  </div>);
};

// ── PULSE POINTS TAB ──
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
  {name:"Bronze",min:0,max:9999,color:"#cd7f32",glow:"0 0 8px rgba(205,127,50,0.4)",icon:"\u{1F949}"},
  {name:"Silver",min:10000,max:24999,color:"#c0c0c0",glow:"0 0 8px rgba(192,192,192,0.4)",icon:"\u{1F948}"},
  {name:"Gold",min:25000,max:49999,color:"#fbbf24",glow:"0 0 12px rgba(251,191,36,0.5),0 0 24px rgba(251,191,36,0.2)",icon:"\u{1F947}"},
  {name:"Diamond",min:50000,max:Infinity,color:"#67e8f9",glow:"0 0 12px rgba(103,232,249,0.5),0 0 28px rgba(103,232,249,0.2)",icon:"\u{1F48E}"},
];
const getLoyaltyTier = (totalEarned) => LOYALTY_TIERS.find(t=>totalEarned>=t.min&&totalEarned<=t.max)||LOYALTY_TIERS[0];
const getNextTier = (totalEarned) => LOYALTY_TIERS.find(t=>totalEarned<t.min)||null;

const PulsePointsTab = ({user,onLogin}) => {
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

  const loadData = useCallback(async ()=>{
    if(!user) return;
    const {data:p}=await supabase.from("profiles").select("*").eq("id",user.id).single();
    setProfile(p);
    const {data:s}=await supabase.from("submissions").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
    setSubs(s||[]);
    const {data:h}=await supabase.from("points_history").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
    setHistory(h||[]);
    const {data:r}=await supabase.from("rewards").select("*").eq("user_id",user.id).order("created_at",{ascending:false});
    setRewards(r||[]);
    const {data:c}=await supabase.from("click_tracking").select("*").eq("user_id",user.id).order("clicked_at",{ascending:false}).limit(50);
    setClicks(c||[]);
    if(p&&p.is_admin){
      const {data:as}=await supabase.from("submissions").select("*").order("created_at",{ascending:false});
      setAdminSubs(as||[]);
      const {data:ar}=await supabase.from("rewards").select("*").order("created_at",{ascending:false});
      setAdminRewards(ar||[]);
    }
  },[user]);

  useEffect(()=>{loadData()},[loadData]);

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
    if(error){alert("Failed to claim: "+error.message);setClaimSubmitting(false);return;}
    await supabase.from("points_history").insert({user_id:user.id,amount:-r.pts,reason:"Reward: "+r.name});
    await supabase.from("profiles").update({points:profile.points-r.pts,rewards_claimed:(profile.rewards_claimed||0)+1}).eq("id",user.id);
    setClaimSubmitting(false);setClaimModal(null);setClaimForm({});loadData();
  };

  const handleRewardStatus = async (rw,status) => {
    const updates={status,fulfilled_by:user.id,fulfilled_at:new Date().toISOString()};
    if(adminNote&&adminNoteId===rw.id) updates.admin_notes=adminNote;
    await supabase.from("rewards").update(updates).eq("id",rw.id);
    setAdminNoteId(null);setAdminNote("");loadData();
  };

  const saveAdminNote = async (rw) => {
    await supabase.from("rewards").update({admin_notes:adminNote}).eq("id",rw.id);
    setAdminNoteId(null);setAdminNote("");loadData();
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

    <div className="pp-tabs">
      <button className={`pp-tab ${ppTab==="submit"?"on":""}`} onClick={()=>setPpTab("submit")}>Submit Purchase</button>
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
    </>}
  </div>);
};

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]=useState("home");
  const [tab,setTab]=useState("firms");
  const [view,setView]=useState("cards");
  const [sort,setSort]=useState("pulse");
  const [sf,setSF]=useState(null);
  const [blogPost,setBlogPost]=useState(null);
  const [user,setUser]=useState(null);
  const [showAuth,setShowAuth]=useState(false);

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

  if(page==="blogpost") return (<><style>{css}</style><div className="ambient"><div className="ambient-gold"/></div><div className="edge-glow"/><div className="side-glow-l"/><div className="side-glow-r"/><div className="top-glow"/><div className="page"><Ticker/><NavBar tab={tab} setTab={setTab} setPage={setPage} user={user} onLogin={()=>setShowAuth(true)} onLogout={handleLogout}/><BlogPostPage post={blogPost} goBack={blogBack}/><div style={{height:40}}/><Footer setPage={setPage} setTab={setTab}/></div></>);
  if(page==="detail") return (<><style>{css}</style><div className="ambient"><div className="ambient-gold"/></div><div className="edge-glow"/><div className="side-glow-l"/><div className="side-glow-r"/><div className="top-glow"/><div className="page"><Ticker/><NavBar tab={tab} setTab={setTab} setPage={setPage} user={user} onLogin={()=>setShowAuth(true)} onLogout={handleLogout}/><DetailPage firm={sf} goBack={goBack}/><Footer setPage={setPage} setTab={setTab}/></div></>);

  return (<><style>{css}</style>
    <div className="ambient"><div className="ambient-gold"/></div><div className="edge-glow"/><div className="side-glow-l"/><div className="side-glow-r"/><div className="top-glow"/>
    <div className="page">
    <Ticker/>
    <NavBar tab={tab} setTab={setTab} setPage={setPage} user={user} onLogin={()=>setShowAuth(true)} onLogout={handleLogout}/>
    <div className="wrap">
      <div className="hero">
        <div className="hero-code">PULSE</div>
        <h1>Your Code to <em>Every Futures Prop Firm</em></h1>
        <p>One discount code. Every major firm. Exposed rules, real Pulse Scores, and a free 150K account given away every week.</p>
        <div className="hero-stats">
          <div className="hero-stat"><b style={{color:'var(--gold)',textShadow:'var(--glow-gold-sm)'}}>50%</b><small>Avg Discount</small></div>
          <div className="hero-stat"><b style={{color:'var(--em)',textShadow:'var(--glow-sm)'}}>10</b><small>Partner Firms</small></div>
          <div className="hero-stat"><b style={{color:'var(--gold)',textShadow:'var(--glow-gold-sm)'}}>$150K</b><small>Given Away Weekly</small></div>
          <div className="hero-stat"><b style={{color:'var(--em)',textShadow:'var(--glow-sm)'}}>45+</b><small>Challenges</small></div>
        </div>
      </div>
      <div className="hero-divider"/>
    </div>
    <div className="wrap">

      <div className="ctabs">
        {[["firms","Firms"],["challenges","Challenges"],["offers","Offers"],["giveaways","Giveaway"],["blog","Research"],["points","\u2B50 Pulse Points"]].map(([k,l])=>(
          <button key={k} className={`ctab${tab===k?' on':''}`} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>

      {tab==="firms"&&<>
        <div className="filters" style={{marginBottom:16,justifyContent:'center'}}>
          <button className={`f-btn ${sort==="pulse"?"on":""}`} onClick={()=>setSort("pulse")}>Pulse Score</button>
          <button className={`f-btn ${sort==="rating"?"on":""}`} onClick={()=>setSort("rating")}>Top Rated</button>
          <button className={`f-btn ${sort==="newest"?"on":""}`} onClick={()=>setSort("newest")}>Newest</button>
          <button className={`f-btn ${sort==="alloc"?"on":""}`} onClick={()=>setSort("alloc")}>Highest Alloc</button>
        </div>
        <FirmCards firms={sorted} onSelect={goDetail} user={user}/>
      </>}
      {tab==="challenges"&&<ChallengesTab/>}
      {tab==="offers"&&<OffersTab user={user}/>}
      {tab==="giveaways"&&<GiveawaysTab/>}
      {tab==="blog"&&<BlogTab onSelect={goBlog}/>}
      {tab==="points"&&<PulsePointsTab user={user} onLogin={()=>setShowAuth(true)}/>}
    </div>
    <Footer setPage={setPage} setTab={setTab}/>
    </div>
    {showAuth&&<AuthModal onClose={()=>setShowAuth(false)} onAuth={u=>{setUser(u);setShowAuth(false)}}/>}
  </>);
}
