import mongoose from "mongoose";

let comedians = [
    {
        _id: mongoose.Types.ObjectId(1),
        name: "Jerry Seinfeld",
        description: "Jerry Seinfeld is best known for playing a semi-fictionalized version of himself in the sitcom Seinfeld. As a standup, Seinfeld specializes in observational comedy and is revered as one of the best known and critically acclaimed comedians of his generation.",
        accountImage: "s3://comedianimages/jerrySeinfeld/accountImage/jerry-seinfeld.jpg",
        specials: [
            {
                specialTitle: "I'm Telling You for the Last Time",
                specialCover: "s3://comedianimages/jerrySeinfeld/specialCovers/im-telling-you-for-the-last-time.jpg",
                specialDescription: "Months after his classic TV sitcom ends, the legendary comic returns to his stand-up roots to deliver his best jokes on a sold-out international tour.",
                releaseYear: 1998,
                specialTrailer: null,
                specialRatings: [
                    {
                        userId: null,
                        rating: 2
                    },
                    {
                        userId: null,
                        rating: 5
                    }
                ],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/21028726"
                    }
                ]
            },
            {
                specialTitle: "Jerry Before Seinfeld",
                specialCover: "s3://comedianimages/jerrySeinfeld/specialCovers/jerry-before-seinfeld.jpg",
                specialDescription: "Jerry Seinfeld returns to the club that gave him his start in the 1970s, mixing iconic jokes with stories from his childhood and early days in comedy.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/jerrySeinfeld/specialTrailers/jerry-before-seinfeld.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80163156"
                    }
                ]
            },
            {
                specialTitle: "23 Hours to Kill",
                specialCover: "s3://comedianimages/jerrySeinfeld/specialCovers/23-hours-to-kill.jpg",
                specialDescription: 'Jerry Seinfeld takes the stage in New York and tackles talking vs. texting, bad buffets vs. so-called "great" restaurants and the magic of Pop Tarts.',
                releaseYear: 2020,
                specialTrailer: "s3://comedianimages/jerrySeinfeld/specialTrailers/23-hours-to-kill.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80170847"
                    }
                ]
            }            
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=n0E7EaRLmSI",
            "https://www.youtube.com/watch?v=FA4kxlObK9Q",
            "https://www.youtube.com/watch?v=6xIoegYONAg",
            "https://www.youtube.com/watch?v=IwuarzMMHAg"
        ],
        comments: [
            {
                commentAuthor: "Julia Smith",
                commentDate: new Date("November 19, 2020 02:15:00").toLocaleString('en-US').replace(/:\d\d /, " "),
                commentContent: "I Love This!",
                commentLikes: []
            }
        ],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 5,
            views: 250
        },
        tags: [
            "Clean",
            "Observational",
            "Relatable"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(2),
        name: "Mike Birbiglia",
        description: "Mike Birbiglia is a comedian, storyteller, director and actor who has performed in front of audiences worldwide, from the Sydney Opera House to Broadway. His shows, “My Girlfriend’s Boyfriend” and “Thank God for Jokes,” were both filmed for Netflix. His most recent show, “The New One,” ran for 99 shows at the Cort Theatre.",
        accountImage: "s3://comedianimages/mikeBirbiglia/accountImage/mike-birbiglia.jpg",
        specials: [
            {
                specialTitle: "What I Should Have Said Was Nothing: Tales from My Public Journal",
                specialCover: "s3://comedianimages/mikeBirbiglia/specialCovers/what-i-should-have-said-was-nothing-tales-from-my-public-journal.jpg",
                specialDescription: "Mike Birbiglia performs in this live special that features a riotous selection of the unique insights and observations culled from his diary. Part concert, part stand-up, this special is sure to delight all Birbiglia fans!",
                releaseYear: 2008,
                specialTrailer: "s3://comedianimages/mikeBirbiglia/specialTrailers/what-i-should-have-said-was-nothing-tales-from-my-public-journal.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Mike-Birbiglia-What-Should-Nothing/dp/B07L5RPVXK"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70091304"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=Vg4dJ1SV1hw"
                    }
                ]
            },
            {
                specialTitle: "My Girlfriend's Boyfriend",
                specialCover: "s3://comedianimages/mikeBirbiglia/specialCovers/my-girlfriends-boyfriend.jpg",
                specialDescription: "On this painfully honest but hilarious journey, Birbiglia struggles to find reason in an area where it may be impossible to find: love.",
                releaseYear: 2013,
                specialTrailer: "s3://comedianimages/mikeBirbiglia/specialTrailers/my-girlfriends-boyfriend.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Mike-Birbiglia-My-Girlfriends-Boyfriend/dp/B00UCZW0K6"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70279934"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=KIdUjH-8E4U"
                    }
                ]
            },
            {
                specialTitle: "Thank God for Jokes",
                specialCover: "s3://comedianimages/mikeBirbiglia/specialCovers/thank-god-for-jokes.jpg",
                specialDescription: "Comedian Mike Birbiglia takes the stage in Brooklyn and hits on hard truths about puppets, late people and the very real dangers of being funny.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/mikeBirbiglia/specialTrailers/thank-god-for-jokes.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80133550"
                    }
                ]
            },
            {
                specialTitle: "The New One",
                specialCover: "s3://comedianimages/mikeBirbiglia/specialCovers/the-new-one.jpg",
                specialDescription: "Comedian Mike Birbiglia hits Broadway with a hilarious yet profound one-man show that recounts his emotional and physical journey to parenthood.",
                releaseYear: 2019,
                specialTrailer: "s3://comedianimages/mikeBirbiglia/specialTrailers/the-new-one.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/81062293"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=gjgOhztMyGk",
            "https://www.youtube.com/watch?v=B02NsP33pRM",
            "https://www.youtube.com/watch?v=W-_M4r-gKI0",
            "https://www.youtube.com/watch?v=ECWgZlkwtfA"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 5,
            views: 0
        },
        tags: [
            "Clean",
            "Family",
            "Relationships",
            "Story Telling"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(3),
        name: "Dave Chappelle",
        description: 'Dave Chappelle is a legendary comedian from Washington D.C. With his incisive observations, he has been described as "poetically unfiltered and sociopolitically introspective, with an ability to illuminate and interrogate agonizing and poignant topics." To date, Chappelle has received four Primetime Emmy Awards and three Grammy Awards for his stand-up and skit comedy.',
        accountImage: "s3://comedianimages/daveChappelle/accountImage/dave-chappelle.jpg",
        specials: [
            {
                specialTitle: "Killin' Them Softly",
                specialCover: "s3://comedianimages/daveChappelle/specialCovers/killin-them-softly.jpg",
                specialDescription: "Dave Chappelle returns to D.C. and riffs on politics, police, race relations, drugs, Sesame Street and more.",
                releaseYear: 2000,
                specialTrailer: "s3://comedianimages/daveChappelle/specialTrailers/killin-them-softly.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Dave-Chappelle-Killin-Them-Softly/dp/B001IHWEI0"
                    },
                    {
                        service: "hulu",
                        specialPage: "https://www.hulu.com/movie/dave-chappelle-killin-them-softly-234ee338-a3d6-4532-8110-47d43290aaa7"
                    },
                    {
                        service: "hbo-max",
                        specialPage: "https://www.hbomax.com/feature/urn:hbo:feature:GVU31HAmJ0oNJjhsJAZ91"
                    }
                ]
            },
            {
                specialTitle: "For What It's Worth",
                specialCover: "s3://comedianimages/daveChappelle/specialCovers/for-what-its-worth.jpg",
                specialDescription: "Chappelle cuts loose in what he does best, Chappelle-style! And for what it's worth, no one is safe from Dave!",
                releaseYear: 2004,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Dave-Chappelle-What-Its-Worth/dp/B000JO9JVS"
                    }
                ]
            },
            {
                specialTitle: "The Age of Spin: Dave Chappelle Live at the Hollywood Palladium",
                specialCover: "s3://comedianimages/daveChappelle/specialCovers/the-age-of-spin.jpg",
                specialDescription: "Dave Chappelle gives his usual skewed insight into the topics of race, technology, OJ Simpson, and more in a stand up special filmed in Hollywood.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/daveChappelle/specialTrailers/the-age-of-spin.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80171965"
                    }
                ]
            },
            {
                specialTitle: "Deep in the Heart of Texas: Dave Chappelle Live at Austin City Limits",
                specialCover: "s3://comedianimages/daveChappelle/specialCovers/deep-in-the-heart-of-texas.jpg",
                specialDescription: "Dave Chappelle gives his stand about racially charged run-ins, celebrity scandals and fatherly dilemmas in his stand-up set at Austin's Moody Theater.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/daveChappelle/specialTrailers/deep-in-the-heart-of-texas.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80171965"
                    }
                ]
            },
            {
                specialTitle: "Equanimity",
                specialCover: "s3://comedianimages/daveChappelle/specialCovers/equanimity.jpg",
                specialDescription: "Dave talks about not actually growing up in the projects, the hate he received from the transgender community, and from fake news.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/daveChappelle/specialTrailers/equanimity.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80230402"
                    }
                ]
            },
            {
                specialTitle: "The Bird Revelation",
                specialCover: "s3://comedianimages/daveChappelle/specialCovers/the-bird-revelation.jpg",
                specialDescription: "Dave jokes about the sexual assaults dominating the 2017 entertainment news and how and why people allow themselves to be abused.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/daveChappelle/specialTrailers/the-bird-revelation.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80230402"
                    }
                ]
            },
            {
                specialTitle: "Sticks & Stones",
                specialCover: "s3://comedianimages/daveChappelle/specialCovers/sticks-&-stones.jpg",
                specialDescription: "Dave Chappelle takes on gun culture, the opioid crisis, and the tidal wave of celebrity scandals in a defiant stand-up special filmed in Atlanta.",
                releaseYear: 2019,
                specialTrailer: "s3://comedianimages/daveChappelle/specialTrailers/sticks-&-stones.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/81140577"
                    }
                ]
            },
            {
                specialTitle: "8:46",
                specialCover: "s3://comedianimages/daveChappelle/specialCovers/846.jpg",
                specialDescription: "Dave Chappelle addresses George Floyd's death and racial injustice in a stand-up special filmed in Ohio.",
                releaseYear: 2020,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=3tR6mKcBbT4"
                    }
                ]
            },
            {
                specialTitle: "Unforgiven",
                specialCover: "s3://comedianimages/daveChappelle/specialCovers/unforgiven.png",
                specialDescription: "Dave Chappelle delves into his past and talks about his experiences in show business.",
                releaseYear: 2020,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=GSGzW4MYcXU"
                    }
                ]
            },
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=wZXoErL2124",
            "https://www.youtube.com/watch?v=Fj9-8szH6ro",
            "https://www.youtube.com/watch?v=jxUQATD6Ezs",
            "https://www.youtube.com/watch?v=-kVoVUe9rQw"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 4,
            views: 150
        },
        tags: [
            "Irreverent",
            "Political",
            "Race"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(4),
        name: "Kevin Hart",
        description: "Kevin Hart is a stand-up comedian and actor from Philadelphia, Pennsylvania. His international comedy career has seen him touch on his personal life, family, and his upbringing.",
        accountImage: "s3://comedianimages/kevinHart/accountImage/kevin-hart.jpg",
        specials: [
            {
                specialTitle: "I'm a Grown Little Man",
                specialCover: "s3://comedianimages/kevinHart/specialCovers/im-a-grown-little-man.jpg",
                specialDescription: "With his wisecracking one-of-a-kind style of comedy, Kevin Hart pokes fun at everyone - even his audience.",
                releaseYear: 2009,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Kevin-Hart-Grown-Little-Man/dp/B001SENS6A"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70111504"
                    }
                ]
            },
            {
                specialTitle: "Seriously Funny",
                specialCover: "s3://comedianimages/kevinHart/specialCovers/seriously-funny.jpg",
                specialDescription: '"Seriously Funny" stars Kevin Hart performing in front of a sold out crowd live from Cleveland, Ohio - where he delivers his hilarious and unique brand of comedy. In this unforgettable night of comedy, Kevin is in rare form and funny as ever!',
                releaseYear: 2010,
                specialTrailer: "s3://comedianimages/kevinHart/specialTrailers/seriously-funny.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Kevin-Hart-Seriously-Funny/dp/B00KQFKSF6"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=cwsThMmUSfU"
                    }
                ]
            },
            {
                specialTitle: "Laugh at My Pain",
                specialCover: "s3://comedianimages/kevinHart/specialCovers/laugh-at-my-pain.jpg",
                specialDescription: "Experience the show that quickly became a national phenomenon, and get an up close and personal look at Kevin Hart back in Philly, where he began his journey to become one of the funniest comedians of all time. You will laugh 'til it hurts.",
                releaseYear: 2011,
                specialTrailer: "s3://comedianimages/kevinHart/specialTrailers/laugh-at-my-pain.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Kevin-Hart-Laugh-At-Pain/dp/B00KQFMYQM"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=LyPfooBp8v0"
                    }
                ]
            },
            {
                specialTitle: "Let Me Explain",
                specialCover: "s3://comedianimages/kevinHart/specialCovers/let-me-explain.jpg",
                specialDescription: 'Filmed at a sold-out performance at Madison Square Garden, comedian Kevin Hart delivers material from his 2012 "Let Me Explain" concert tour.',
                releaseYear: 2013,
                specialTrailer: "s3://comedianimages/kevinHart/specialTrailers/let-me-explain.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Kevin-Hart-Let-Me-Explain/dp/B00FDV6YWO"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=LgwpwOPEe-I"
                    }
                ]
            },
            {
                specialTitle: "What Now?",
                specialCover: "s3://comedianimages/kevinHart/specialCovers/what-now.jpg",
                specialDescription: "Comedian Kevin Hart performs in front of a crowd of 53,000 people at Philadelphia's outdoor venue, Lincoln Financial Field.",
                releaseYear: 2016,
                specialTrailer: "s3://comedianimages/kevinHart/specialTrailers/what-now.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Kevin-Hart-What-Now/dp/B01M72FAHI"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80106743"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=iMaW8jiav7U"
                    }
                ]
            },
            {
                specialTitle: "Irresponsible",
                specialCover: "s3://comedianimages/kevinHart/specialCovers/irresponsible.jpg",
                specialDescription: "Stand-up comedian Kevin Hart talks about his family, travel and a year full of reckless behavior in front of a live sold-out crowd in London.",
                releaseYear: 2019,
                specialTrailer: "s3://comedianimages/kevinHart/specialTrailers/irresponsible.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80174687"
                    }
                ]
            },
            {
                specialTitle: "Zero F**ks Given",
                specialCover: "s3://comedianimages/kevinHart/specialCovers/zero-fucks-given.jpg",
                specialDescription: "Kevin Hart delivers a comedy special from the comfort of his own home.",
                releaseYear: 2020,
                specialTrailer: "s3://comedianimages/kevinHart/specialTrailers/zero-fucks-given.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80174688"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=GTW8IplsKmM",
            "https://www.youtube.com/watch?v=gbxSpLDQehg",
            "https://www.youtube.com/watch?v=NBO3vF8p0J0",
            "https://www.youtube.com/watch?v=byVefTTeKww"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 3,
            views: 0
        },
        tags: [
            "Observational",
            "Story Telling",
            "Family"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(5),
        name: "Demetri Martin",
        description: "Demetri Martin is an American comedian, actor, director, cartoonist and musician. He was a contributor on The Daily Show. In stand-up, he is known for his deadpan delivery, playing his guitar for jokes, and his satirical cartoons.",
        accountImage: "s3://comedianimages/demetriMartin/accountImage/demetri-martin.jpg",
        specials: [
            {
                specialTitle: "Demetri Martin. Person.",
                specialCover: "s3://comedianimages/demetriMartin/specialCovers/demetri-martin-person.jpg",
                specialDescription: 'With his trademark blend of wry and penetrating humor, inspired art and music, "The Daily Show" correspondent and funnyman Demetri Martin will tie you up in stitches in this hour-long extravaganza of monologues and multimedia.',
                releaseYear: 2007,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Demetri-Martin-Person-Martin/dp/B01H80RXNQ"
                    }
                ]
            },
            {
                specialTitle: "Demetri Martin. Standup Comedian.",
                specialCover: "s3://comedianimages/demetriMartin/specialCovers/demetri-martin-standup-comedian.jpg",
                specialDescription: "This is Demetri Martin's second hour-long standup comedy special. It includes a lot of content that did not air on television.",
                releaseYear: 2012,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Demetri-Martin-Standup-Comedian-Martin/dp/B009LHLTY4"
                    }
                ]
            },
            {
                specialTitle: "Demetri Martin: Live (At the Time)",
                specialCover: "s3://comedianimages/demetriMartin/specialCovers/demetri-martin-live-at-the-time.jpg",
                specialDescription: 'Demetri Martin brings his off-kilter take on acoustic guitar, hairless cats, color schemes, and the word "nope" to Washington in his original special.',
                releaseYear: 2015,
                specialTrailer: "s3://comedianimages/demetriMartin/specialTrailers/demetri-martin-live-at-the-time.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80044804"
                    }
                ]
            },
            {
                specialTitle: "The Overthinker",
                specialCover: "s3://comedianimages/demetriMartin/specialCovers/the-overthinker.jpg",
                specialDescription: "With his signature one-liners and drawings, Demetri Martin muses on doughnut holes, dogs, sports bars, the alphabet's most aggressive letters and more.",
                releaseYear: 2018,
                specialTrailer: "s3://comedianimages/demetriMartin/specialTrailers/the-overthinker.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80158802"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=YAgFr7Crpf4",
            "https://www.youtube.com/watch?v=1gOKB2AfsHY",
            "https://www.youtube.com/watch?v=-4LUjBLmfMM",
            "https://www.youtube.com/watch?v=8OPOWwR3GNs"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 2,
            views: 0
        },
        tags: [
            "Quirky",
            "Observational",
            "Relatable"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(6),
        name: "Sebastian Maniscalco",
        description: 'In 2018, Sebastian Maniscalco reached heights that few comedians could ever dream about. With a string of record-breaking, sold-out arena and theatre shows; a best-selling memoir, Stay Hungry, and a role in Green Book, which won Best Picture at the Academy Awards, it’s no surprise that Billboard honored him with their inaugural "Comedian of the Year" award.',
        accountImage: "s3://comedianimages/sebastianManiscalco/accountImage/sebastian-maniscalco.jpg",
        specials: [
            {
                specialTitle: "Sebastian Live",
                specialCover: "s3://comedianimages/sebastianManiscalco/specialCovers/sebastian-live.jpg",
                specialDescription: "Filmed at the famed Paramount Theatre in St. Louis, MO, Sebastian Live is impeccably paced and chock-full of seething observations on daily human behavior.",
                releaseYear: 2007,
                specialTrailer: "s3://comedianimages/sebastianManiscalco/specialTrailers/sebastian-live.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Sebastian-Live-Maniscalco/dp/B003JFGKVG"
                    }
                ]
            },
            {
                specialTitle: "What's Wrong With People?",
                specialCover: "s3://comedianimages/sebastianManiscalco/specialCovers/whats-wrong-with-people.jpg",
                specialDescription: `What's Wrong with People?" asks Sebastian Maniscalco, as he hilariously tries to bridge the Italian-American Old World he grew up in with the contemporary frenetic world we all live in today.`,
                releaseYear: 2012,
                specialTrailer: "s3://comedianimages/sebastianManiscalco/specialTrailers/whats-wrong-with-people.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Sebastian-Maniscalco-Whats-Wrong-People/dp/B074PJ9RJL"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70229037"
                    }
                ]
            },
            {
                specialTitle: "Aren't You Embarrassed?",
                specialCover: "s3://comedianimages/sebastianManiscalco/specialCovers/arent-you-embarrassed.jpg",
                specialDescription: "Sebastian Maniscalco returns home to Chicago to perform in front of a live sold-out audience in this all-new comedy event. With his inimitable delivery, he burns modern-day society through the lens of his old-world Italian-American upbringing. No topic is off-limits - but perhaps we all should be just a little embarrassed.",
                releaseYear: 2014,
                specialTrailer: "s3://comedianimages/sebastianManiscalco/specialTrailers/arent-you-embarrassed.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Sebastian-Maniscalco-Arent-You-Embarrassed/dp/B011XB9HNU"
                    }
                ]
            },
            {
                specialTitle: "Why Would You Do That?",
                specialCover: "s3://comedianimages/sebastianManiscalco/specialCovers/why-would-you-do-that.jpg",
                specialDescription: "Filmed at the legendary Beacon Theatre, Sebastian Maniscalco continues to deliver his signature comedy style that blends high-energy physical acts-outs and hilariously demonstrative facial expressions.",
                releaseYear: 2016,
                specialTrailer: "s3://comedianimages/sebastianManiscalco/specialTrailers/why-would-you-do-that.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Sebastian-Maniscalco-Why-Would-That/dp/B01N1QYVCV"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/81001278"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=kYI9V_pApuc"
                    }
                ]
            },
            {
                specialTitle: "Stay Hungry",
                specialCover: "s3://comedianimages/sebastianManiscalco/specialCovers/stay-hungry.jpg",
                specialDescription: "Sebastian's captivating storytelling keeps the audience engaged as he unpacks spin classes, pregnancy photoshoots, and wedding dances.",
                releaseYear: 2019,
                specialTrailer: "s3://comedianimages/sebastianManiscalco/specialTrailers/stay-hungry.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80218104"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=e8QZwnJZTgQ",
            "https://www.youtube.com/watch?v=KijAPJXjg8c",
            "https://www.youtube.com/watch?v=GO-i9MGYO3E",
            "https://www.youtube.com/watch?v=triQ2yf_TL0"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 12,
            views: 100
        },
        tags: [
            "Observational",
            "Relatable"        
        ]
    },
    {
        _id: mongoose.Types.ObjectId(7),
        name: "Deon Cole",
        description: "Deon Cole is a SAG and Primetime Emmy Award nominated comedian best known for his work as a writer for Conan O' Brien and his appearances on the ABC sitcom Black-ish. Cole has performed stand-up on programs such as John Oliver's New York Stand Up Show, Mash Up, and Lopez Tonight.",
        accountImage: "s3://comedianimages/deonCole/accountImage/deon-cole.jpg",
        specials: [
            {
                specialTitle: "Cole Blooded Seminar",
                specialCover: "s3://comedianimages/deonCole/specialCovers/cole-blooded-seminar.jpg",
                specialDescription: "Deon Cole gets it poppin' in Washington, D.C.'s Lincoln Theatre in his very first one-hour stand-up special. Deon Cole explains what's thicker than cold peanut butter, knowing when better looking dudes are around, how to manage his blackness and more.",
                releaseYear: 2016,
                specialTrailer: "s3://comedianimages/deonCole/specialTrailers/cole-blooded-seminar.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Deon-Cole-Blooded-Seminar/dp/B01HHNQTL6"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=Q-T6OBw30ag"
                    }
                ]
            },
            {
                specialTitle: "Cole Hearted",
                specialCover: "s3://comedianimages/deonCole/specialCovers/cole-hearted.jpg",
                specialDescription: 'Embracing his belief that comedy is the last raw form of expression, Deon Cole explains the right time to thank Jesus and the wrong time to say "welp."',
                releaseYear: 2019,
                specialTrailer: "s3://comedianimages/deonCole/specialTrailers/cole-hearted.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80995737"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=BWnwBX_fxMk",
            "https://www.youtube.com/watch?v=k3JM9zoKGmw",
            "https://www.youtube.com/watch?v=fUOI8z99gJc",
            "https://www.youtube.com/watch?v=eZ6HlRtDZMs"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 11,
            views: 0
        },
        tags: [
            "Race",
            "Relationships"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(8),
        name: "Aziz Ansari",
        description: 'Aziz Ansari first rose to prominance in his breakout role as "Tom Haverford" in the NBC Sitcom series Parks & Recreation. Ansari has since gone on to win several acting and writing awards for his Netflix show Master of None, and has performed stand-up shows everywhere from intimate comedy clubs to larger venues like Madison Square Garden',
        accountImage: "s3://comedianimages/azizAnsari/accountImage/aziz-ansari.jpg",
        specials: [
            {
                specialTitle: "Intimate Moments for a Sensual Evening",
                specialCover: "s3://comedianimages/azizAnsari/specialCovers/intimate-moments-for-a-sensual-evening.jpg",
                specialDescription: "Comedian Aziz Ansari presents his highly anticipated, hour-long debut stand-up special. The critically acclaimed stand-up discusses topics ranging from sheets with fraudulent thread counts to the chubbiness of his young cousin Harris. Also included is a special encore performance from RAAAAAAAANDY. Don't make a decision you'll regret forever.",
                releaseYear: 2010,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Aziz-Ansari-Intimate-Moments-Sensual/dp/B00352XRZK"
                    }
                ]
            },
            {
                specialTitle: "Dangerously Delicious",
                specialCover: "s3://comedianimages/azizAnsari/specialCovers/dangerously-delicious.jpg",
                specialDescription: "Aziz Ansari channels his crude side in this 2012 comedy special, taking on topics like watching porn and the struggles of dating in New York City.",
                releaseYear: 2012,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: []
            },
            {
                specialTitle: "Buried Alive",
                specialCover: "s3://comedianimages/azizAnsari/specialCovers/buried-alive.jpg",
                specialDescription: "Aziz Ansari focuses his unique viewpoint on pending adulthood, babies, marriage and love in the modern era.",
                releaseYear: 2013,
                specialTrailer: "s3://comedianimages/azizAnsari/specialTrailers/buried-alive.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70290568"
                    }
                ]
            },
            {
                specialTitle: "Live in Madison Square Garden",
                specialCover: "s3://comedianimages/azizAnsari/specialCovers/live-in-madison-square-garden.jpg",
                specialDescription: "Stand-up comedian and TV star Aziz Ansari delivers his sharp witted take on immigrants, relationships and the food industry.",
                releaseYear: 2015,
                specialTrailer: "s3://comedianimages/azizAnsari/specialTrailers/live-in-madison-square-garden.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80038296"
                    }
                ]
            },
            {
                specialTitle: "Right Now",
                specialCover: "s3://comedianimages/azizAnsari/specialCovers/right-now.jpg",
                specialDescription: "In a comedy special directed by Spike Jonze, Aziz Ansari shares deep personal insights and hilarious takes on wokeness, family and the social climate.",
                releaseYear: 2019,
                specialTrailer: "s3://comedianimages/azizAnsari/specialTrailers/right-now.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/81098589"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=cYdsWtku9gg",
            "https://www.youtube.com/watch?v=LJqhSipUuzw",
            "https://www.youtube.com/watch?v=GqR2f9NzGMk",
            "https://www.youtube.com/watch?v=lWA-xsAVzgE"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 10,
            views: 0
        },
        tags: [
            "Relatable",
            "Relationships"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(9),
        name: "Jim Gaffigan",
        description: "Jim Gaffigan is a veteran stand-up performer from Chesterton, Indiana. His material is often about fatherhood, observations, laziness, and food. Gaffigan has released several successful comedy specials, including Mr. Universe, Obsessed, Cinco, and Quality Time, all of which have received Grammy nominations.",
        accountImage: "s3://comedianimages/jimGaffigan/accountImage/jim-gaffigan.jpg",
        specials: [
            {
                specialTitle: "Beyond the Pale",
                specialCover: "s3://comedianimages/jimGaffigan/specialCovers/beyond-the-pale.jpg",
                specialDescription: "Comedian Jim Gaffigan cuts loose on a variety of topics, including Hot Pockets, holidays, Catholicism and his favorite activity: doing nothing.",
                releaseYear: 2006,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Jim-Gaffigan-Beyond-Pale/dp/B000NZ412U"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70044256"
                    }
                ]
            },
            {
                specialTitle: "King Baby",
                specialCover: "s3://comedianimages/jimGaffigan/specialCovers/king-baby.jpg",
                specialDescription: "Jim Gaffigan offers up his take on bacon, bowling and other weighty topics in this stand-up performance filmed live in Austin on his 2008 comedy tour.",
                releaseYear: 2009,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Jim-Gaffigan-King-Baby/dp/B002GDVP8A"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70113636"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=peK96DDWrD0"
                    }
                ]
            },
            {
                specialTitle: "Mr. Universe",
                specialCover: "s3://comedianimages/jimGaffigan/specialCovers/mr-universe.jpg",
                specialDescription: "Funnyman Jim Gaffigan offers up his unique take on everything from Disney World to overweight whales in this live show from Washington, D.C.",
                releaseYear: 2012,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70237054"
                    }
                ]
            },
            {
                specialTitle: "Obssessed",
                specialCover: "s3://comedianimages/jimGaffigan/specialCovers/obsessed.jpg",
                specialDescription: "Comic Jim Gaffigan delivers his sardonic take on topics like eating, exercise, weddings and his five kids in this live stand-up special.",
                releaseYear: 2014,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Jim-Gaffigan-Obsessed/dp/B00JAKE5B6"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70301469"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=tTyzWwibvy8"
                    }
                ]
            },
            {
                specialTitle: "Cinco",
                specialCover: "s3://comedianimages/jimGaffigan/specialCovers/cinco.jpg",
                specialDescription: "America's king of clean comedy delivers wickedly funny jokes in his fifth hour-long special.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/jimGaffigan/specialTrailers/cinco.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80117811"
                    }
                ]
            },
            {
                specialTitle: "Noble Ape",
                specialCover: "s3://comedianimages/jimGaffigan/specialCovers/noble-ape.jpg",
                specialDescription: 'In his all new "Noble Ape" stand up special, Jim Gaffigan gets personal as he discusses the medical crisis that befell his wife. Other topics include his kids, his travels, doctors, colonoscopy, Catholic saints and, of course, Philly.',
                releaseYear: 2018,
                specialTrailer: "s3://comedianimages/jimGaffigan/specialTrailers/noble-ape.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Jim-Gaffigan-Noble-Ape/dp/B07LC14Z8N"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=npPTRFB7zvM"
                    }
                ]
            },
            {
                specialTitle: "Quality Time",
                specialCover: "s3://comedianimages/jimGaffigan/specialCovers/quality-time.jpg",
                specialDescription: "Jim Gaffigan is in top form for his 7th comedy special. The 4-time Grammy nominated comedian, doesn’t understand why we aren’t more honest about the reasons we don’t want to attend events, while at the same time embraces lying to kids. From horses and dog birthdays to traveling and museums, Jim continues to impress. Sit back and enjoy Quality Time with Jim Gaffigan!",
                releaseYear: 2019,
                specialTrailer: "s3://comedianimages/jimGaffigan/specialTrailers/quality-time.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Jim-Gaffigan-Quality-Time/dp/B07VBK6DRN"
                    }
                ]
            },
            {
                specialTitle: "The Pale Tourist",
                specialCover: "s3://comedianimages/jimGaffigan/specialCovers/the-pale-tourist.jpg",
                specialDescription: "Jim Gaffigan boldly goes where no stand-up comedian has gone before: everywhere! During the Pale Tourist global tour, Jim traveled the world meeting locals and learning about their culture. He then transformed those experiences into stand-up sets of all-new material specific to each country he visited. Watch as Jim brings his relatable brand of comedy to Spain and Canada in these two new specials.",
                releaseYear: 2020,
                specialTrailer: "s3://comedianimages/jimGaffigan/specialTrailers/the-pale-tourist.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Jim-Gaffigan-The-Pale-Tourist/dp/B08C6JHVMT"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=N-i9GXbptog",
            "https://www.youtube.com/watch?v=KYKGFujJp6Y",
            "https://www.youtube.com/watch?v=C7fZBoNjqqY",
            "https://www.youtube.com/watch?v=OlaJK3EL34M"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 9,
            views: 300
        },
        tags: [
            "Clean",
            "Family",
            "Observational",
            "Relatable"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(10),
        name: "Tig Notaro",
        description: "Tig Notaro is a Grammy Award nominated comedian from Pass Christian, Mississippi. Notaro is a favorite on numerous talk shows, including Ellen, The Late Show with Stephen Colbert, and Conan. She is also a frequent public radio contributor. Tig continues to tour internationally, selling out Carnegie Hall in 2016.",
        accountImage: "s3://comedianimages/tigNotaro/accountImage/tig-notaro.jpg",
        specials: [
            {
                specialTitle: "Boyish Girl Interrupted",
                specialCover: "s3://comedianimages/tigNotaro/specialCovers/boyish-girl-interrupted.jpg",
                specialDescription: "Grammy(R)-nominated comedian Tig Notaro headlines and directs this stand-up comedy special taped at the Wilbur Theatre in Boston, MA. Known for her distinctive storytelling, offbeat sense of humor and honesty, Notaro's deadpan stand-up style draws on highly personal experiences, including a breast-cancer diagnosis and the death of her mother.",
                releaseYear: 2015,
                specialTrailer: "s3://comedianimages/tigNotaro/specialTrailers/boyish-girl-interrupted.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Tig-Notaro-Boyish-Girl-Interrupted/dp/B016UEKL8A"
                    },
                    {
                        service: "hbo-max",
                        specialPage: "https://www.hbomax.com/feature/urn:hbo:feature:GVZMjTgb_HcLDESwJAAAx"
                    },
                    {
                        service: "hulu",
                        specialPage: "https://www.hulu.com/movie/tig-notaro-boyish-girl-interrupted-3f0e855b-8a1a-44cd-a877-3fc2d2f9367f"
                    }
                ]
            },
            {
                specialTitle: "Happy To Be Here",
                specialCover: "s3://comedianimages/tigNotaro/specialCovers/happy-to-be-here.jpg",
                specialDescription: "Comedian Tig Notaro unleashes her inner prankster in a playful stand-up special packed with funny anecdotes, parenting confessions and more.",
                releaseYear: 2018,
                specialTrailer: "s3://comedianimages/tigNotaro/specialTrailers/happy-to-be-here.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80151384"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=pkwOrteyQtY",
            "https://www.youtube.com/watch?v=yitxaN8LZ4M",
            "https://www.youtube.com/watch?v=jSwzYB545hY",
            "https://www.youtube.com/watch?v=dXRsPlhx5ao"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 8,
            views: 0
        },
        tags: [
            "Clean",
            "Quirky"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(11),
        name: "Brian Regan",
        description: "Brian Regan has distinguished himself as one of the premier comedians in the country. The perfect balance of sophisticated writing and physicality, Brian fills theaters nationwide with fervent fans that span generations.",
        accountImage: "s3://comedianimages/brianRegan/accountImage/brian-regan.jpg",
        specials: [
            {
                specialTitle: "I Walked on the Moon",
                specialCover: "s3://comedianimages/brianRegan/specialCovers/i-walked-on-the-moon.jpg",
                specialDescription: "This contains some of Brian Regan's best stand-up comedy including: Emergency Room, Visiting the Doctor, Food, UPS, Refrigerator, Phones and Codes, Airline Stuff, Inventions, Eye Doctor, and Dinner Party.",
                releaseYear: 2004,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: []
            },
            {
                specialTitle: "Standing Up!",
                specialCover: "s3://comedianimages/brianRegan/specialCovers/standing-up.jpg",
                specialDescription: "Brian Regan uses wry observations and physical humor to tackle all the important topics like butterflies, show horses and greeting cards.",
                releaseYear: 2007,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Brian-Regan-Standing-Up/dp/B01HOT9L1S"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=spt09XgT0SY"
                    }
                ]
            },
            {
                specialTitle: "The Epitome of Hyperbole",
                specialCover: "s3://comedianimages/brianRegan/specialCovers/the-epitome-of-hyperbole.jpg",
                specialDescription: "Brian Regan exposes the truth behind psychics, discusses the stupidest crimes, and offers his suggestions on how to improve the opera with his easygoing manner and physical brand of humor.",
                releaseYear: 2008,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Brian-Regan-Epitome-Hyperbole/dp/B002GE3U96"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=l-3xjap2nuM"
                    }
                ]
            },
            {
                specialTitle: "Live from Radio City Music Hall",
                specialCover: "s3://comedianimages/brianRegan/specialCovers/live-from-radio-city-music-hall.jpg",
                specialDescription: `Brian Regan reinvigorates comedy with his new live stand-up special, "Live From Radio City Music Hall." He describes what it's like to work at IHOP, demonstrates the awkwardness of going to a new doctor and challenges the common notion that you shouldn't grocery shop when you're hungry. Anything could happen, so expect lots of Regan's signature high-energy social commentary.`,
                releaseYear: 2015,
                specialTrailer: "s3://comedianimages/brianRegan/specialTrailers/live-from-radio-city-music-hall.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Brian-Regan-Live-Radio-Music/dp/B019JH30V0"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=75FYzQcMywM"
                    }
                ]
            },
            {
                specialTitle: "Nunchucks and Flamethrowers",
                specialCover: "s3://comedianimages/brianRegan/specialCovers/nunchucks-and-flamethrowers.jpg",
                specialDescription: "Brian Regan takes relatable family humor to new heights as he talks board games, underwear elastic and looking for hot dogs in all the wrong places.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/brianRegan/specialTrailers/nunchucks-and-flamethrowers.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80134827"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=metSo5FcbfI",
            "https://www.youtube.com/watch?v=r6GHPIwkXl0",
            "https://www.youtube.com/watch?v=KPrSHrIvWI4",
            "https://www.youtube.com/watch?v=RFQ1448Yzt8"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 6,
            views: 200
        },
        tags: [
            "Clean",
            "Quirky",
            "Observational"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(12),
        name: "Marc Maron",
        description: "For over fifteen years, Marc Maron has been writing and performing raw, honest and thought-provoking comedy for print, stage, radio and television. A legend in the stand-up community, he has appeared on HBO, Conan, Letterman, his two Comedy Central Presents specials and almost every show that allows comics to perform.",
        accountImage: "s3://comedianimages/marcMaron/accountImage/marc-maron.jpg",
        specials: [
            {
                specialTitle: "Thinky Pain",
                specialCover: "s3://comedianimages/marcMaron/specialCovers/thinky-pain.jpg",
                specialDescription: "Alternative comic Marc Maron is back on stage in New York to talk Chinese food, drug abuse, sex in hotel rooms and life with his girlfriend.",
                releaseYear: 2013,
                specialTrailer: "s3://comedianimages/marcMaron/specialTrailers/thinky-pain.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Marc-Maron-Thinky-LANCE-BANGS/dp/B00IS6GAH0"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70273401"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=STcMcS_Uw80"
                    }
                ]
            },
            {
                specialTitle: "More Later",
                specialCover: "s3://comedianimages/marcMaron/specialCovers/more-later.png",
                specialDescription: "Marc Maron: More Later captures Maron as he dishes out compelling, raw and wildly honest stand-up.  In this brand new special, Maron tackles religion, relationships, rage, Skype sex and ice cream among other topics.",
                releaseYear: 2015,
                specialTrailer: "s3://comedianimages/marcMaron/specialTrailers/more-later.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Marc-Maron-More-Later/dp/B01CDTTZ7E"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=pitrkW1VAgs"
                    }
                ]
            },
            {
                specialTitle: "Too Real",
                specialCover: "s3://comedianimages/marcMaron/specialCovers/too-real.jpg",
                specialDescription: "Battle-scarred stand-up comedian Marc Maron unleashes a storm of ideas about meditation, mortality, documentary films and our weird modern world.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/marcMaron/specialTrailers/too-real.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80177405"
                    }
                ]
            },
            {
                specialTitle: "End Times Fun",
                specialCover: "s3://comedianimages/marcMaron/specialCovers/end-times-fun.jpg",
                specialDescription: "Marc Maron wades through a swamp of vitamin hustlers, evangelicals and grown male nerd children, culminating in a gleefully filthy end-times fantasy.",
                releaseYear: 2020,
                specialTrailer: "s3://comedianimages/marcMaron/specialTrailers/end-times-fun.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/81040891"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=yKn0xxhWmzQ",
            "https://www.youtube.com/watch?v=0FP4m_S5bpQ",
            "https://www.youtube.com/watch?v=unycv1cqRY4",
            "https://www.youtube.com/watch?v=9pO364hKcK8"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 5,
            views: 0
        },
        tags: [
            "Dark",
            "Observational",
            "Story Telling"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(13),
        name: "Patton Oswalt",
        description: 'Patton Oswalt is an accomplished stand-up comedian and voice actor from Sterling, Virginia. In his work as a stand-up comedian, Oswalt has appeared in six stand-up specials and won a Primetime Emmy Award and a Grammy Award for his Netflix special Patton Oswalt: Talking for Clapping.',
        accountImage: "s3://comedianimages/pattonOswalt/accountImage/patton-oswalt.jpg",
        specials: [
            {
                specialTitle: "My Weakness is Strong",
                specialCover: "s3://comedianimages/pattonOswalt/specialCovers/my-weakness-is-strong.jpg",
                specialDescription: "The critically-acclaimed comedian, actor, and writer takes time out from his many film and television outings to return to the comedy stage for his fourth stand-up special.",
                releaseYear: 2009,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Patton-Oswalt-My-Weakness-Strong/dp/B003A3R2XC"
                    }
                ]
            },
            {
                specialTitle: "Finest Hour",
                specialCover: "s3://comedianimages/pattonOswalt/specialCovers/finest-hour.jpg",
                specialDescription: "In his fourth (and GRAMMY-nominated) full-length special, Patton Oswalt covers a range of topics from how hipsters make the Spam museum sad to the greatness of sweatpants and revisits his attack on KFC Famous Bowls.",
                releaseYear: 2011,
                specialTrailer: "s3://comedianimages/pattonOswalt/specialTrailers/finest-hour.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Patton-Oswalt-Finest-Hour/dp/B007X15L8A"
                    }
                ]
            },
            {
                specialTitle: "Tragedy Plus Comedy Equals Time",
                specialCover: "s3://comedianimages/pattonOswalt/specialCovers/tragedy-plus-comedy-equals-time.jpg",
                specialDescription: 'Patton is at his best with his stand-up special "Tragedy Plus Comedy Equals Time." Performing at Spreckels Theatre in San Diego, Patton covers the trials and tribulations of frozen food, a failed outing with a prostitute, fatherhood and beyond.',
                releaseYear: 2014,
                specialTrailer: "s3://comedianimages/pattonOswalt/specialTrailers/tragedy-plus-comedy-equals-time.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Patton-Oswalt-Tragedy-Comedy-Equals/dp/B00J7XE3QS"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=S6MCv2eMIIM"
                    }
                ]
            },
            {
                specialTitle: "Talking for Clapping",
                specialCover: "s3://comedianimages/pattonOswalt/specialCovers/talking-for-clapping.jpg",
                specialDescription: "On stage in San Francisco, the comedian covers topics like old people getting drugs, his worst stand-up set, gay proms and a horrible birthday clown.",
                releaseYear: 2016,
                specialTrailer: "s3://comedianimages/pattonOswalt/specialTrailers/talking-for-clapping.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80082862"
                    }
                ]
            },
            {
                specialTitle: "Annihilation",
                specialCover: "s3://comedianimages/pattonOswalt/specialCovers/annihilation.jpg",
                specialDescription: "By turns scathing and candid, Patton Oswalt reflects on the glut of comic material in the Trump era and the dark days following a personal tragedy.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/pattonOswalt/specialTrailers/annihilation.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80177406"
                    }
                ]
            },
            {
                specialTitle: "I Love Everything",
                specialCover: "s3://comedianimages/pattonOswalt/specialCovers/i-love-everything.jpg",
                specialDescription: "Turning 50. Finding love again. Buying a house. Experiencing existential dread at Denny's. Life comes at Patton Oswalt fast in this stand-up special.",
                releaseYear: 2020,
                specialTrailer: "s3://comedianimages/pattonOswalt/specialTrailers/i-love-everything.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/81206879"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=FO-LVTdNEqA",
            "https://www.youtube.com/watch?v=Rh9Y1CXmBbg",
            "https://www.youtube.com/watch?v=fxsLqsQzxRk",
            "https://www.youtube.com/watch?v=YN_MJLNW4aQ"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 4,
            views: 0
        },
        tags: [
            "Family",
            "Observational",
            "Story Telling"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(14),
        name: "D.L. Hughley",
        description: "D.L. Hughley is one of the most popular and highly recognized stand-up comedians on the road today and has also made quite an impression in the television, film, and radio arenas. Hughley is a veteran of numerous talk show appearances and known for his astute and politically savvy observations.",
        accountImage: "s3://comedianimages/dLHughley/accountImage/dl-hughley.jpg",
        specials: [
            {
                specialTitle: "Going Home",
                specialCover: "s3://comedianimages/dLHughley/specialCovers/going-home.jpg",
                specialDescription: "Comedian D.L. Hughley hits the stage for this show full of sidesplitting material, including his insights on family and fatherhood.",
                releaseYear: 1999,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/D-L-Hughley-Going-Home/dp/B01FWTG1EM"
                    },
                    {
                        service: "hbo-max",
                        specialPage: "https://www.hbomax.com/feature/urn:hbo:feature:GVU23NgPSZ4NJjhsJAVvq"
                    },
                    {
                        service: "hulu",
                        specialPage: "https://www.hulu.com/movie/dl-hughley-going-home-ee5fd0b6-3e44-46c2-8103-993a43230306"
                    }
                ]
            },
            {
                specialTitle: "Unapologetic",
                specialCover: "s3://comedianimages/dLHughley/specialCovers/unapologetic.jpg",
                specialDescription: "Popular stand-up comic D.L. Hughley takes the stage in Washington, D.C., in his fourth HBO special.",
                releaseYear: 2007,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/D-L-Hughley-Unapologetic/dp/B00KGJP8L6"
                    },
                    {
                        service: "hbo-max",
                        specialPage: "https://www.hbomax.com/feature/urn:hbo:feature:GVU41dgPouFFvjSoJAd8k"
                    },
                    {
                        service: "hulu",
                        specialPage: "https://www.hulu.com/movie/dl-hughley-unapologetic-a196f18d-801d-4e29-9b44-41a9c8aa4837"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=0nwYS0Rsyok"
                    }
                ]
            },
            {
                specialTitle: "Reset",
                specialCover: "s3://comedianimages/dLHughley/specialCovers/reset.jpg",
                specialDescription: "If you like your comedy served up raw, tasty and wicked-funny, D.L. Hughley is your kind of stand-up guy. One of the most popular comedians of film, TV and radio unleashes a hilarious display of stand-up comedy genius in this uncut Showtime special taped before a wildly enthusiastic live New Jersey audience. It's comedy that'll re-boot your entire sense of humor: D.L. Hughley: Reset!",
                releaseYear: 2012,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/D-L-Hughley-Reset/dp/B07XFGXL42"
                    },
                    {
                        service: "hulu",
                        specialPage: "https://www.hulu.com/movie/dl-hughley-reset-551164f0-bed4-4bd9-a2e5-1cb457a9453d"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=RQJ5vAJPI9s"
                    }
                ]
            },
            {
                specialTitle: "Clear",
                specialCover: "s3://comedianimages/dLHughley/specialCovers/clear.jpg",
                specialDescription: "Politically insightful legendary comedian, D.L. Hughley, takes the stage at the Regency Theatre in San Francisco. Hughley riffs on current affairs and reviews everything from legalizing marijuana to the value of having nosey white neighbors.",
                releaseYear: 2014,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/D-L-Hughley-Clear/dp/B07L6HXBR6"
                    },
                    {
                        service: "hulu",
                        specialPage: "https://www.hulu.com/movie/dl-hughley-clear-674a73c8-2f07-4356-896e-183698cb23fa"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80044126"
                    }
                ]
            },
            {
                specialTitle: "Contrarian",
                specialCover: "s3://comedianimages/dLHughley/specialCovers/contrarian.jpg",
                specialDescription: "D.L. Hughley riffs on hot-button political issues, celebrity scandals, his mother's tough love and more in a rapid-fire stand-up show in Philadelphia.",
                releaseYear: 2018,
                specialTrailer: "s3://comedianimages/dLHughley/specialTrailers/contrarian.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80213654"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=5lMeaG_cIJs",
            "https://www.youtube.com/watch?v=4yEQJXkd8HI",
            "https://www.youtube.com/watch?v=KCES0VzW8c4",
            "https://www.youtube.com/watch?v=ERZiSLLWB30"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 3,
            views: 0
        },
        tags: [
            "Political",
            "Race"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(15),
        name: "John Mulaney",
        description: "John Mulaney is a comedian from Chicago, Illinois, best known for his work as a writer on Saturday Night Live and for his stand-up career which includes his 2018 special Kid Gorgeous; for which Mulaney received a Primetime Emmy award.",
        accountImage: "s3://comedianimages/johnMulaney/accountImage/john-mulaney.jpg",
        specials: [
            {
                specialTitle: "New In Town",
                specialCover: "s3://comedianimages/johnMulaney/specialCovers/new-in-town.jpg",
                specialDescription: "Stand-up comedian John Mulaney tackles such red-hot topics as quicksand, Motown singers and an elderly man he once met in a bathroom.",
                releaseYear: 2012,
                specialTrailer: "s3://comedianimages/johnMulaney/specialTrailers/new-in-town.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/John-Mulaney-New-Town/dp/B0072LF8IE"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70298251"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=g5Xm-zojKqM"
                    }
                ]
            },
            {
                specialTitle: "The Comeback Kid",
                specialCover: "s3://comedianimages/johnMulaney/specialCovers/the-comeback-kid.jpg",
                specialDescription: 'Armed with boyish charm and a sharp wit, the former "SNL" writer offers sly takes on marriage, his beef with babies and the time he met Bill Clinton.',
                releaseYear: 2015,
                specialTrailer: "s3://comedianimages/johnMulaney/specialTrailers/the-comeback-kid.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80058424"
                    }
                ]
            },
            {
                specialTitle: "Kid Gorgeous at Radio City",
                specialCover: "s3://comedianimages/johnMulaney/specialCovers/kid-gorgeous-at-radio-city.jpg",
                specialDescription: 'John Mulaney relays stories from his childhood and "SNL," eviscerates the value of college and laments getting older in this electric comedy special.',
                releaseYear: 2018,
                specialTrailer: "s3://comedianimages/johnMulaney/specialTrailers/kid-gorgeous-at-radio-city.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80238110"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=1MBjJMMKASQ",
            "https://www.youtube.com/watch?v=quZU_hA4Pr4",
            "https://www.youtube.com/watch?v=BNlyZSvsNjw",
            "https://www.youtube.com/watch?v=DTaJjznuY74"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 2,
            views: 0
        },
        tags: [
            "Clean",
            "Relatable"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(16),
        name: "Katherine Ryan",
        description: "Katherine Ryan is a Canadian comedian based out of the U.K. who is best known for her myriad British panel show appearences as well as her live stand-up shows In Trouble and Glitter Room.",
        accountImage: "s3://comedianimages/katherineRyan/accountImage/katherine-ryan.jpg",
        specials: [
            {
                specialTitle: "In Trouble",
                specialCover: "s3://comedianimages/katherineRyan/specialCovers/in-trouble.jpg",
                specialDescription: "Stand-up comic Katherine Ryan reminisces about unusual relationships, life in the hometown she hates and the time she enraged an entire nation.",
                releaseYear: 2017,
                specialTrailer: "s3://comedianimages/katherineRyan/specialTrailers/in-trouble.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80134968"
                    }
                ]
            },
            {
                specialTitle: "Glitter Room",
                specialCover: "s3://comedianimages/katherineRyan/specialCovers/glitter-room.jpg",
                specialDescription: "Fresh from a tour, comedian Katherine Ryan shares shrewd observations about school bullies, revenge bodies and raising a very fancy child.",
                releaseYear: 2019,
                specialTrailer: "s3://comedianimages/katherineRyan/specialTrailers/glitter-room.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80238020"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=tSXhvfe9b_g",
            "https://www.youtube.com/watch?v=8kpL8C9r_GI",
            "https://www.youtube.com/watch?v=FybyRaScHrI",
            "https://www.youtube.com/watch?v=4QB4Ay9tWeY"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 1,
            views: 0
        },
        tags: [
            "Feminist",
            "Relationships"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(17),
        name: "Hannibal Buress",
        description: "Hannibal Buress began his stand-up career in 2002 at an open mic while attending Southern Illinois University. Buress has written for programs such as Saturday Night Live and 30 Rock. His standup comedy has been featured on programs such as Live at Gotham, John Oliver's New York Stand-Up Show.",
        accountImage: "s3://comedianimages/hannibalBuress/accountImage/hannibal-buress.jpg",
        specials: [
            {
                specialTitle: "Animal Furnace",
                specialCover: "s3://comedianimages/hannibalBuress/specialCovers/animal-furnace.jpg",
                specialDescription: "Hannibal's a Chicago native, currently living in New York City where he regularly performs and lives alone with no pets. He recorded this DVD in December of 2011 and it went pretty well. You should buy it or rent it or borrow it. Don't steal it. His credits include writing for 30 Rock, SNL and performing in several basements of bars in NYC and Chicago.",
                releaseYear: 2012,
                specialTrailer: "s3://comedianimages/hannibalBuress/specialTrailers/animal-furnace.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Hannibal-Buress-Animal-Furnace/dp/B008578DCM"
                    },{
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=o1f9rfjYzSs"
                    }
                ]
            },
            {
                specialTitle: "Live From Chicago",
                specialCover: "s3://comedianimages/hannibalBuress/specialCovers/live-from-chicago.jpg",
                specialDescription: `Hannibal is back with his new hour-long stand-up special, "Hannibal Buress: Live From Chicago," taped at the Vic Theatre in his hometown of Chicago, IL. Buress' latest offering features more of the signature dry wit and cool delivery we've come to love. This time around, the Comedy Central favorite rolls out new material about his own second line parade in New Orleans, fistfights in London, and many memorable late nights on the road. This extended and uncensored special is one not to be missed.`,
                releaseYear: 2014,
                specialTrailer: "s3://comedianimages/hannibalBuress/specialTrailers/live-from-chicago.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Hannibal-Buress-Live-Chicago/dp/B00J7XEKN4"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=p7IScj7WvRg"
                    }
                ]
            },
            {
                specialTitle: "Comedy Camisado",
                specialCover: "s3://comedianimages/hannibalBuress/specialCovers/comedy-camisado.jpg",
                specialDescription: "In a special packed with stealthy humor, Hannibal Buress tackles zipper etiquette, the legacy of steroids and the fallout from his Bill Cosby routine.",
                releaseYear: 2016,
                specialTrailer: "s3://comedianimages/hannibalBuress/specialTrailers/comedy-camisado.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80059410"
                    }
                ]
            },
            {
                specialTitle: "Hannibal Takes Edinburgh",
                specialCover: "s3://comedianimages/hannibalBuress/specialCovers/hannibal-takes-edinburgh.jpg",
                specialDescription: "Hannibal Buress braves Scotland's epic Fringe festival in Edinburgh, performing dozens of wry stand-up sets and testing new material on the locals.",
                releaseYear: 2016,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: []
            },
            {
                specialTitle: "Miami Nights",
                specialCover: "s3://comedianimages/hannibalBuress/specialCovers/miami-nights.jpg",
                specialDescription: "Mildly successful comedian, Hannibal Buress, performs his second stand-up special in Chicago based on his wild night with the police.",
                releaseYear: 2020,
                specialTrailer: "s3://comedianimages/hannibalBuress/specialTrailers/miami-nights.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=kVc4-05Agf0"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=xlonY2l3V9c",
            "https://www.youtube.com/watch?v=uQecHQfy8eQ",
            "https://www.youtube.com/watch?v=xp2KsaI4uKY",
            "https://www.youtube.com/watch?v=Psx6elljRF8"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 1,
            views: 0
        },
        tags: [
            "Observational",
            "Race",
            "Relatable"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(18),
        name: "Colin Quinn",
        description: "Colin Quinn is a stand-up comedian from Brooklyn. He is known for crafting broadway standup shows with overarching themes dealing with history and politics.",
        accountImage: "s3://comedianimages/colinQuinn/accountImage/colin-quinn.jpg",
        specials: [
            {
                specialTitle: "Long Story Short",
                specialCover: "s3://comedianimages/colinQuinn/specialCovers/long-story-short.jpg",
                specialDescription: "Taped before a live audience in New York City, Long Story Short showcases the comedian's keen observations in the uproarious history of the world, juxtaposing modern-day human behavior with the rise and fall of empires. From his personification of Caesar as the original mobster to his complaints about Ancient Greece giving way to Costco and Snooki, Quinn is at his satirical best.",
                releaseYear: 2011,
                specialTrailer: "s3://comedianimages/colinQuinn/specialTrailers/long-story-short.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Colin-Quinn-Long-Story-Short/dp/B07HBBJXKB"
                    }
                ]
            },
            {
                specialTitle: "Unconstitutional",
                specialCover: "s3://comedianimages/colinQuinn/specialCovers/unconstitutional.jpg",
                specialDescription: "New York comedian Colin Quinn writes and stars in this live one-man stage show that dissects and deconstructs U.S. constitutional history.",
                releaseYear: 2015,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Colin-Quinn-Unconstitutional/dp/B0711ST3LV"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80068219"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=DzURMZ100aY"
                    }
                ]
            },
            {
                specialTitle: "The New York Story",
                specialCover: "s3://comedianimages/colinQuinn/specialCovers/the-new-york-story.jpg",
                specialDescription: 'The "SNL" veteran performs his off-Broadway show about the history of New York and the people who shape its personality. Directed by Jerry Seinfeld.',
                releaseYear: 2016,
                specialTrailer: "s3://comedianimages/colinQuinn/specialTrailers/the-new-york-story.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/80117534"
                    }
                ]
            },
            {
                specialTitle: "Red State, Blue State",
                specialCover: "s3://comedianimages/colinQuinn/specialCovers/red-state-blue-state.jpg",
                specialDescription: "Stand-up comedian Colin Quinn calls out the hypocrisies of the left and the right in this special based on his politically charged Off-Broadway show.",
                releaseYear: 2019,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/81156592"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=ATyst0FZfLQ",
            "https://www.youtube.com/watch?v=3rdXYB1Gc2g",
            "https://www.youtube.com/watch?v=EK_YNohcdwA",
            "https://www.youtube.com/watch?v=nOr2NbuiMCw"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 1,
            views: 0
        },
        tags: [
            "Political",
            "Story Telling"
        ]
    },
    {
        _id: mongoose.Types.ObjectId(19),
        name: "Tom Papa",
        description: "With more than 20 years as a stand-up comedian, Tom Papa is one of the top comedic voices in the country finding success in film, TV, radio and podcasts as well as on the live stage. He is a regular guest on The Joe Rogan Experience podcast and the late night TV shows.",
        accountImage: "s3://comedianimages/tomPapa/accountImage/tom-papa.jpg",
        specials: [
            {
                specialTitle: "Tom Papa: Live in New York City",
                specialCover: "s3://comedianimages/tomPapa/specialCovers/tom-papa-live-in-new-york-city.jpg",
                specialDescription: "Comedian Tom Papa riffs on the trials of married life, fatherhood in the 21st century, domestic pets and more in his stand-up show.",
                releaseYear: 2011,
                specialTrailer: null,
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Tom-Papa-Live-York-City/dp/B01EBL6HQ4"
                    },
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/70266169"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=z9_JTDTIpqc"
                    }
                ]
            },
            {
                specialTitle: "Freaked Out",
                specialCover: "s3://comedianimages/tomPapa/specialCovers/freaked-out.jpg",
                specialDescription: "Famously upbeat comedian Tom Papa delivers a stand-up performance that includes his observations on the perils of raising daughters, and more. Executive produced by Rob Zombie.",
                releaseYear: 2013,
                specialTrailer: "s3://comedianimages/tomPapa/specialTrailers/freaked-out.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Tom-Papa-Freaked-Out/dp/B00G510P8K"
                    },
                    {
                        service: "youtube",
                        specialPage: "https://www.youtube.com/watch?v=mQFw1erwNEA"
                    }
                ]
            },
            {
                specialTitle: "Human Mule",
                specialCover: "s3://comedianimages/tomPapa/specialCovers/human-mule.jpg",
                specialDescription: 'Veteran comedian, Tom Papa, returns to Epix in "Human Mule" with a refreshingly positive take on fighting for survival in an increasingly chaotic world.',
                releaseYear: 2016,
                specialTrailer: "s3://comedianimages/tomPapa/specialTrailers/human-mule.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "amazon-prime",
                        specialPage: "https://www.amazon.com/Tom-Papa-Human-Jay-Chapman/dp/B06XGS8T1Q"
                    }
                ]
            },
            {
                specialTitle: "You're Doing Great!",
                specialCover: "s3://comedianimages/tomPapa/specialCovers/youre-doing-great.jpg",
                specialDescription: 'Comedian Tom Papa takes on body image issues, social media, pets, Staten Island, the "old days" and more in a special from his home state of New Jersey.',
                releaseYear: 2020,
                specialTrailer: "s3://comedianimages/tomPapa/specialTrailers/youre-doing-great.mp4",
                specialRatings: [],
                specialAvailability: [
                    {
                        service: "netflix",
                        specialPage: "https://www.netflix.com/title/81103777"
                    }
                ]
            }
        ],
        popularVideos: [
            "https://www.youtube.com/watch?v=ABNus3skvfk",
            "https://www.youtube.com/watch?v=7yGzN9tMB_M",
            "https://www.youtube.com/watch?v=bzj90eZ4QhE",
            "https://www.youtube.com/watch?v=6m_-mziiUpA"
        ],
        comments: [],
        metrics: {
            favoritesReceived: [],
            favoritesCount: 1,
            views: 100
        },
        tags: [
            "Clean",
            "Family",
            "Observational",
            "Relatable"
        ]
    }
];

let users = [
    {
        _id: mongoose.Types.ObjectId(20),
        username: "userOne",
        password: "userOnePassword",
        favorited: [
            comedians[0]._id,
            comedians[1]._id,
            comedians[5]._id
        ],
        recentlyViewed: [
            comedians[6]._id,
            comedians[7]._id,
            comedians[9]._id,
            comedians[10]._id
        ],
    },
    {
        _id: mongoose.Types.ObjectId(21),
        username: "userTwo",
        password: "userTwoPassword",
        favorited: [
            comedians[0]._id,
            comedians[1]._id,
            comedians[2]._id,
            comedians[6]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(22),
        username: "userThree",
        password: "userThreePassword",
        favorited: [
            comedians[0]._id,
            comedians[1]._id,
            comedians[2]._id,
            comedians[3]._id,
            comedians[7]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(23),
        username: "userFour",
        password: "userFourPassword",
        favorited: [
            comedians[0]._id,
            comedians[1]._id,
            comedians[2]._id,
            comedians[3]._id,
            comedians[4]._id,
            comedians[8]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(24),
        username: "userFive",
        password: "userFivePassword",
        favorited: [
            comedians[0]._id,
            comedians[1]._id,
            comedians[2]._id,
            comedians[3]._id,
            comedians[4]._id,
            comedians[9]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(25),
        username: "userSix",
        password: "userSixPassword",
        favorited: [
            comedians[5]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(26),
        username: "userSeven",
        password: "userSevenPassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(27),
        username: "userEight",
        password: "userEightPassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id,
            comedians[7]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(28),
        username: "userNine",
        password: "userNinePassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id,
            comedians[7]._id,
            comedians[8]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(29),
        username: "userTen",
        password: "userTenPassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id,
            comedians[7]._id,
            comedians[8]._id,
            comedians[9]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(30),
        username: "userEleven",
        password: "userElevenPassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id,
            comedians[7]._id,
            comedians[8]._id,
            comedians[9]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(31),
        username: "userTwelve",
        password: "userTwelvePassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id,
            comedians[7]._id,
            comedians[8]._id,
            comedians[9]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(32),
        username: "userThirteen",
        password: "userThirteenPassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id,
            comedians[7]._id,
            comedians[8]._id,
            comedians[9]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(33),
        username: "userFourteen",
        password: "userFourteenPassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id,
            comedians[7]._id,
            comedians[8]._id,
            comedians[9]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(34),
        username: "userFifteen",
        password: "userFifteenPassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id,
            comedians[7]._id,
            comedians[8]._id,
            comedians[9]._id        
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(35),
        username: "userSixteen",
        password: "userSixteenPassword",
        favorited: [
            comedians[5]._id,
            comedians[6]._id,
            comedians[7]._id,
            comedians[8]._id,
            comedians[9]._id        
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(36),
        username: "userSeventeen",
        password: "userSeventeenPassword",
        favorited: [
            comedians[10]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(37),
        username: "userEighteen",
        password: "userEighteenPassword",
        favorited: [
            comedians[10]._id,
            comedians[11]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(38),
        username: "userNineteen",
        password: "userNineteenPassword",
        favorited: [

            comedians[10]._id,
            comedians[11]._id,
            comedians[12]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(39),
        username: "userTwenty",
        password: "userTwentyPassword",
        favorited: [
            comedians[10]._id,
            comedians[11]._id,
            comedians[12]._id,
            comedians[13]._id 
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(40),
        username: "userTwentyOne",
        password: "userTwentyOnePassword",
        favorited: [
            comedians[10]._id,
            comedians[11]._id,
            comedians[12]._id,
            comedians[13]._id,
            comedians[14]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(41),
        username: "userTwentyTwo",
        password: "userTwentyTwoPassword",
        favorited: [
            comedians[10]._id,
            comedians[11]._id,
            comedians[12]._id,
            comedians[13]._id,
            comedians[14]._id,
            comedians[15]._id
        ],
        recentlyViewed: [],
    },
    {
        _id: mongoose.Types.ObjectId(),
        username: "userTwentyThree",
        password: "userTwentyThreePassword",
        favorited: [
            comedians[14]._id,
            comedians[15]._id,
            comedians[16]._id,
            comedians[17]._id,
            comedians[18]._id
        ],
        recentlyViewed: [],
    }
];

let tourDatesGeneral = [
    {
        name: "Hannibal Buress",
        accountImage: comedians[16].accountImage,
        url: "http://hannibalburesstest.com/",
        date: {
            localDate: "December 8th",
            localYear:"2020",
            day: "Sunday",
            localTime: "8:30pm",
            dateTBD: false,
            dateTBA: false,
            timeTBA: false,
        },
        recent: true,
        venue: {
            name: "New World Center",
            city: "Miami",
            state: "FL"
        }
    },
    {
        name: "Tig Notaro",
        accountImage: comedians[9].accountImage,
        url: "http://tignotarotest.com/",
        date: {
            localDate: "November 17th",
            localYear:"2020",
            day: "Tuesday",
            localTime: null,
            dateTBD: false,
            dateTBA: false,
            timeTBA: true,
        },
        recent: false,
        venue: {
            name: "Apollo Theater",
            city: "New York",
            state: "NY"
        }
    },
];

let tourDatesSingleComedian = [
    {
        name: "Jerry Seinfeld",
        accountImage: comedians[0].accountImage,
        url: "http://jerryseinfeldtest.com/",
        date: {
            localDate: "January 26th",
            localYear:"2021",
            day: "Tuesday",
            localTime: "8:30pm",
            dateTBD: false,
            dateTBA: false,
            timeTBA: false,
        },
        recent: true,
        venue: {
            name: "Straz Center",
            city: "Tampa",
            state: "FL"
        }
    },
    {
        name: "Jerry Seinfeld",
        accountImage: comedians[0].accountImage,
        url: "http://jerryseinfeldtest.com/",
        date: {
            localYear:"2020",
            dateTBD: true,
            dateTBA: false,
            timeTBA: false,
        },
        recent: false,
        venue: {
            name: "The Comedy Store",
            city: "Los Angeles",
            state: "CA"
        }
    },
    {
        name: "Jerry Seinfeld",
        accountImage: comedians[0].accountImage,
        url: "http://jerryseinfeldtest.com/",
        date: {
            localYear:"2020",
            dateTBD: false,
            dateTBA: true,
            timeTBA: false,
        },
        recent: false,
        venue: {
            name: "Radio City Music Hall",
            city: "New York",
            state: "NY"
        }
    }
];

//To avoid circular variable dependencies, must populate the static properties of the first array first, than the referenced properties afterward.
comedians[0].specials[0].specialRatings[0].userId = users[0]._id;
comedians[0].specials[0].specialRatings[1].userId = users[1]._id;
comedians[0].comments[0].commentLikes.push(users[0]._id, users[1]._id, users[2]._id);

comedians[0].metrics.favoritesReceived.push(users[0]._id, users[1]._id, users[2]._id, users[3]._id, users[4]._id);
comedians[1].metrics.favoritesReceived.push(users[0]._id, users[1]._id, users[2]._id, users[3]._id, users[4]._id);
comedians[2].metrics.favoritesReceived.push(users[1]._id, users[2]._id, users[3]._id, users[4]._id);
comedians[3].metrics.favoritesReceived.push(users[2]._id, users[3]._id, users[4]._id);
comedians[4].metrics.favoritesReceived.push(users[3]._id, users[4]._id);
comedians[5].metrics.favoritesReceived.push(users[0]._id, users[5]._id, users[6]._id, users[7]._id, users[8]._id, users[9]._id, users[10]._id, users[11]._id, users[12]._id, users[13]._id, users[14]._id, users[15]._id);
comedians[6].metrics.favoritesReceived.push(users[1]._id, users[6]._id, users[7]._id, users[8]._id, users[9]._id, users[10]._id, users[11]._id, users[12]._id, users[13]._id, users[14]._id, users[15]._id);
comedians[7].metrics.favoritesReceived.push(users[2]._id, users[7]._id, users[8]._id, users[9]._id, users[10]._id, users[11]._id, users[12]._id, users[13]._id, users[14]._id, users[15]._id);
comedians[8].metrics.favoritesReceived.push(users[3]._id, users[8]._id, users[9]._id, users[10]._id, users[11]._id, users[12]._id, users[13]._id, users[14]._id, users[15]._id);
comedians[9].metrics.favoritesReceived.push(users[4]._id, users[9]._id, users[10]._id, users[11]._id, users[12]._id, users[13]._id, users[14]._id, users[15]._id);
comedians[10].metrics.favoritesReceived.push(users[16]._id, users[17]._id, users[18]._id, users[19]._id, users[20]._id, users[21]._id);
comedians[11].metrics.favoritesReceived.push(users[17]._id, users[18]._id, users[19]._id, users[20]._id, users[21]._id);
comedians[12].metrics.favoritesReceived.push(users[18]._id, users[19]._id, users[20]._id, users[21]._id);
comedians[13].metrics.favoritesReceived.push(users[19]._id, users[20]._id, users[21]._id);
comedians[14].metrics.favoritesReceived.push(users[20]._id, users[21]._id);
comedians[15].metrics.favoritesReceived.push(users[21]._id);
comedians[16].metrics.favoritesReceived.push(users[22]._id);
comedians[17].metrics.favoritesReceived.push(users[22]._id);
comedians[18].metrics.favoritesReceived.push(users[22]._id);

module.exports = {
    comedians,
    users,
    tourDatesGeneral,
    tourDatesSingleComedian
};