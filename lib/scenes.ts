export const coreScenes = {
    village_gathering: {
        id: "village_gathering",
        name: "The Village Gathering",
        text: "As the sun sets over your coastal Viking village, the community gathers for an important meeting. The air is thick with anticipation as your jarl announces plans for the coming season. You stand among your fellow villagers, knowing that your voice could shape the future of your people.",
        location: "Coastal Viking Village",
        season: "Late Spring, 793 AD",
        storyPhase: "PEACEFUL_BEGINNINGS",
        isRequired: true,
        choices: [
            {
                text: "Advocate for a peaceful trading expedition",
                alignment: "Ljosbearer",
                nextScene: "prepare_trade_voyage"
            },
            {
                text: "Suggest a raid on a nearby settlement",
                alignment: "Myrkrider",
                nextScene: "plan_first_raid"
            },
            {
                text: "Propose building stronger defenses",
                alignment: "Solheart",
                nextScene: "fortify_village"
            },
            {
                text: "Recommend secret scouting of potential targets",
                alignment: "Skuggasmith",
                nextScene: "scouting_mission"
            }
        ]
    },
    prepare_trade_voyage: {
        id: "prepare_trade_voyage",
        name: "Preparing the Trade Voyage",
        text: "With the decision made to embark on a trading expedition, the village buzzes with activity. You find yourself at the docks, overseeing the preparation of a sturdy longship. Goods are being loaded, and the crew is assembling. As a respected voice in the community, you're asked to make some key decisions.",
        location: "Village Docks",
        season: "Early Summer, 793 AD",
        storyPhase: "PEACEFUL_BEGINNINGS",
        isRequired: false,
        choices: [
            {
                text: "Focus on gathering a diverse range of trade goods",
                alignment: "Ljosbearer",
                nextScene: "diverse_cargo"
            },
            {
                text: "Ensure the ship is well-armed, just in case",
                alignment: "Solheart",
                nextScene: "armed_traders"
            },
            {
                text: "Secretly include some warriors disguised as traders",
                alignment: "Skuggasmith",
                nextScene: "hidden_warriors"
            },
            {
                text: "Convince some skilled youths to join as new crew members",
                alignment: "Myrkrider",
                nextScene: "youthful_crew"
            }
        ]
    },
    first_foreign_shore: {
        id: "first_foreign_shore",
        name: "First Foreign Shore",
        text: "After days at sea, your ship approaches an unfamiliar coastline. The beach is lined with dense forests, and smoke rises from what appears to be a settlement inland. As you drop anchor in a hidden cove, the crew looks to you for guidance on how to proceed in this new land.",
        location: "Unknown Foreign Coast",
        season: "Mid-Summer, 793 AD",
        storyPhase: "FIRST_RAIDS",
        isRequired: true,
        choices: [
            {
                text: "Approach openly, with gifts and intentions to trade",
                alignment: "Ljosbearer",
                nextScene: "peaceful_contact"
            },
            {
                text: "Send a small party to scout the settlement secretly",
                alignment: "Skuggasmith",
                nextScene: "covert_scouting"
            },
            {
                text: "Prepare the crew for a surprise raid",
                alignment: "Myrkrider",
                nextScene: "surprise_attack"
            },
            {
                text: "Set up a defensive camp and wait for the locals to notice you",
                alignment: "Solheart",
                nextScene: "defensive_stance"
            }
        ]
    },
    village_expansion: {
        id: "village_expansion",
        name: "Village Expansion",
        text: "Months have passed, and your successful ventures have brought wealth and renown to your village. The jarl calls upon you to help decide how to use these new resources. The village stands at a crossroads, with the potential to grow in several directions.",
        location: "Expanded Viking Village",
        season: "Early Spring, 794 AD",
        storyPhase: "EXPANSION",
        isRequired: true,
        choices: [
            {
                text: "Establish a center of learning and trade",
                alignment: "Ljosbearer",
                nextScene: "found_trade_center"
            },
            {
                text: "Build a formidable fortress to protect the village",
                alignment: "Solheart",
                nextScene: "construct_fortress"
            },
            {
                text: "Invest in a fleet of longships for further exploration",
                alignment: "Myrkrider",
                nextScene: "expand_fleet"
            },
            {
                text: "Create a network of spies and informants",
                alignment: "Skuggasmith",
                nextScene: "establish_spy_network"
            }
        ]
    },
    rival_clan_conflict: {
        id: "rival_clan_conflict",
        name: "Rival Clan Conflict",
        text: "Word reaches your expanding settlement of a rival clan encroaching on your territory. Their ships have been spotted near your fishing grounds, and there are rumors of them establishing a base nearby. The jarl calls a council to decide how to address this growing threat.",
        location: "Jarl's Longhouse",
        season: "Late Summer, 794 AD",
        storyPhase: "CONFLICT",
        isRequired: true,
        choices: [
            {
                text: "Propose a diplomatic meeting to negotiate boundaries",
                alignment: "Ljosbearer",
                nextScene: "peace_talks"
            },
            {
                text: "Prepare for a pre-emptive strike against their new base",
                alignment: "Myrkrider",
                nextScene: "preemptive_attack"
            },
            {
                text: "Fortify your borders and fishing fleet for defense",
                alignment: "Solheart",
                nextScene: "defensive_buildup"
            },
            {
                text: "Infiltrate their clan to gather intelligence and sow discord",
                alignment: "Skuggasmith",
                nextScene: "clan_infiltration"
            }
        ]
    }
};