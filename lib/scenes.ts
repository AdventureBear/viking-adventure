'use client'

import { StoryPhase } from './storyArc'

export type Alignment = 'Ljosbearer' | 'Skuggasmith' | 'Solheart' | 'Myrkrider'

export interface Choice {
  text: string
  alignment: Alignment
  nextScene: string
}

export interface Scene {
  id: string
  text: string
  choices: Choice[]
  location: string
  season: string
  storyPhase: StoryPhase
  isRequired: boolean
}




export const scenes: Record<string, Scene> = {
  clandestine_meeting: {
    id: 'clandestine_meeting',
    text: "The mist clings to the ancient oak trees of the sacred grove, their gnarled branches reaching out like spectral fingers in the dim twilight. You've been summoned here, to this hidden place just beyond the outskirts of Hedeby, by a message carved in runes on a piece of driftwood. The air is thick with tension and the scent of damp earth. As you approach the center of the grove, you spot three hooded figures standing in a triangle around a weathered runestone. Their faces are obscured, but you recognize the emblems on their cloaks – representatives from rival clans. They turn to face you, their postures a mix of wariness and anticipation. It's clear that whatever is about to transpire here could alter the course of your people's future. The weight of the moment settles on your shoulders as you step into the clearing, your hand instinctively brushing against the hilt of your seax.",
    location: "Sacred Grove near Hedeby, Southern Jutland",
    season: "Late Autumn, 798 AD",
    storyPhase: StoryPhase.FIRST_RAIDS,
    isRequired: true,
    choices: [
      {
        text: "Approach openly, calling for unity and shared purpose among the clans in these changing times.",
        alignment: 'Ljosbearer',
        nextScene: 'clan_alliance'
      },
      {
        text: "Remain silent and observe, gathering information before revealing your own intentions.",
        alignment: 'Skuggasmith',
        nextScene: 'secret_negotiations'
      },
      {
        text: "Invoke the old gods, suggesting that this meeting is a sign that we must return to our ancestral ways.",
        alignment: 'Solheart',
        nextScene: 'spiritual_revival'
      },
      {
        text: "Declare that the time for petty rivalries is over – a new era of Viking dominance must begin with us.",
        alignment: 'Myrkrider',
        nextScene: 'war_council'
      }
    ]
  },
  village_alliance: {
    id: 'village_alliance',
    text: "The great hall of Kaupang buzzes with anticipation as representatives from neighboring villages gather. Smoke from the central hearth rises to the rafters, carrying the aroma of roasted meat and mead. Shields and tapestries adorn the walls, telling tales of your people's history. As the leader who proposed this alliance, all eyes turn to you. The fate of these villages hangs in the balance. Some see the potential for shared prosperity, while others fear losing their independence. The challenge before you is to forge a union that respects each village's strengths while creating a network strong enough to withstand external threats and internal strife. Your words and actions here will shape the future of not just your village, but the entire region.",
    location: "Great Hall of Kaupang, Southern Norway",
    season: "Early Autumn, 793 AD",
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: false,
    choices: [
      {
        text: "Propose a council of elders from each village to make collective decisions, ensuring equal representation.",
        alignment: 'Ljosbearer',
        nextScene: 'council_of_elders'
      },
      {
        text: "Suggest a tiered alliance structure, with your village at the top, subtly consolidating power.",
        alignment: 'Skuggasmith',
        nextScene: 'tiered_alliance'
      },
      {
        text: "Advocate for a focus on shared cultural traditions and religious practices to strengthen bonds.",
        alignment: 'Solheart',
        nextScene: 'cultural_unity'
      },
      {
        text: "Propose a military alliance, emphasizing the need for a united defense against potential raiders.",
        alignment: 'Myrkrider',
        nextScene: 'military_pact'
      }
    ]
  },
  peaceful_beginning: {
    id: 'peaceful_beginning',
    text: "The salty breeze carries the scent of pine and smoke as it rustles through the thatched roofs of your coastal village. Waves crash rhythmically against the rocky shore, their sound mingling with the distant bleating of goats and the rhythmic clang of a blacksmith's hammer. The sun hangs low in the sky, casting long shadows across the muddy paths between sturdy wooden longhouses. Children's laughter echoes from near the central fire pit, where village elders gather, their long beards and intricate brooches glinting in the fading light. As a respected member of the community, your gaze falls upon the gathering, contemplating the peaceful life you've known and the whispers of change on the wind.",
    location: "Coastal Norse Village",
    season: "Late Summer, 792 AD",
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: true,
    choices: [
      {
        text: "Join the elders and discuss the upcoming harvest festival.",
        alignment: 'Solheart',
        nextScene: 'harvest_planning'
      },
      {
        text: "Seek out the village's most experienced sailors for a private conversation.",
        alignment: 'Skuggasmith',
        nextScene: 'sailors_tales'
      },
      {
        text: "Organize a community feast to strengthen bonds and share resources.",
        alignment: 'Ljosbearer',
        nextScene: 'community_feast'
      },
      {
        text: "Quietly observe the villagers, identifying potential allies to increase your influence.",
        alignment: 'Myrkrider',
        nextScene: 'gather_supporters'
      }
    ]
  },
  harvest_planning: {
    id: 'harvest_planning',
    text: "You approach the circle of elders, their weathered faces turning to greet you. The air is filled with the earthy scent of freshly harvested grain and the sweet aroma of early autumn fruits. As you discuss the upcoming festival, the conversation inevitably turns to the challenges of the coming winter and the need for resources. An old sailor, his face lined with the stories of a hundred voyages, mentions rumors of rich lands across the sea.",
    location: "Village Center",
    season: "Early Autumn, 792 AD",
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: false,
    choices: [
      {
        text: "Suggest focusing on local trade and strengthening bonds with neighboring villages.",
        alignment: 'Ljosbearer',
        nextScene: 'local_trade_focus'
      },
      {
        text: "Express interest in the sailor's tales and propose a scouting expedition.",
        alignment: 'Skuggasmith',
        nextScene: 'scouting_proposal'
      },
      {
        text: "Advocate for increasing food storage and rationing to ensure winter survival.",
        alignment: 'Solheart',
        nextScene: 'winter_preparations'
      },
      {
        text: "Propose a daring raid on a nearby village to secure more resources.",
        alignment: 'Myrkrider',
        nextScene: 'raid_planning'
      }
    ]
  },
  sailors_tales: {
    id: 'sailors_tales',
    text: "In the shadow of a beached longship, you gather with a group of seasoned sailors. The smell of tar and salt clings to their clothes as they speak in hushed tones of lands to the west. Their eyes gleam with excitement as they describe monasteries filled with gold and guarded only by monks who have never lifted a weapon. The potential for glory and riches hangs heavy in the air, tempting like the siren's call.",
    location: "Village Shore",
    season: "Late Summer, 792 AD",
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: false,
    choices: [
      {
        text: "Encourage the sailors to share their knowledge with the village elders.",
        alignment: 'Solheart',
        nextScene: 'inform_elders'
      },
      {
        text: "Begin secretly planning a raid with the most eager sailors.",
        alignment: 'Myrkrider',
        nextScene: 'secret_raid_plans'
      },
      {
        text: "Propose a peaceful trading expedition to these new lands.",
        alignment: 'Ljosbearer',
        nextScene: 'trading_expedition'
      },
      {
        text: "Suggest a small, covert scouting mission to verify the tales.",
        alignment: 'Skuggasmith',
        nextScene: 'covert_scouting'
      }
    ]
  },
  community_feast: {
    id: 'community_feast',
    text: "The great hall buzzes with excitement as the harvest feast reaches its peak. Flickering torches cast dancing shadows on intricately carved wooden pillars, their warm light glinting off polished drinking horns and gleaming brooches. The air is thick with the aroma of roasted meats, freshly baked bread, and sweet mead. Laughter and animated conversations mingle with the rhythmic strumming of a skald's harp, his voice rising and falling as he recounts tales of gods and heroes. At the head table, you sit among the village elders, keenly aware of the eyes upon you. As the night wears on, you notice hushed conversations and furtive glances exchanged between some of the younger warriors. Their whispers seem to dance on the edge of the firelight, hinting at dreams of adventure and glory beyond the village's borders.",
    location: "Great Hall of Fjordheim",
    season: "Early Autumn, 792 AD",
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: true,
    choices: [
      {
        text: "Stand and propose a toast to local prosperity, steering conversation away from whispers of raids.",
        alignment: 'Ljosbearer',
        nextScene: 'prosperity_speech'
      },
      {
        text: "Quietly encourage those discussing potential raids, probing for more information about their plans.",
        alignment: 'Skuggasmith',
        nextScene: 'clandestine_meeting'
      },
      {
        text: "Announce plans to improve the village's defenses, citing the need for security in uncertain times.",
        alignment: 'Solheart',
        nextScene: 'fortification_project'
      },
      {
        text: "Use the feast as an opportunity to publicly challenge the current leadership, advocating for bolder action.",
        alignment: 'Myrkrider',
        nextScene: 'power_play'
      }
    ]
  },
  village_palisade: {
    id: 'village_palisade',
    text: "You stand atop the village's wooden palisade, your eyes scanning the horizon. The wind carries the scent of earth and pine as you run your hand along the rough-hewn logs. Below, villagers go about their daily tasks: women weave at their looms, men repair fishing nets, and children chase chickens through the muddy streets. As you consider how to strengthen the defenses, a traveler approaches the gate. His cloak is travel-worn, and his eyes hold the glint of distant shores. He brings news of vulnerable monasteries in England, his words painting vivid pictures of wealth and easy conquest.",
    location: "Village Palisade",
    season: "Early Autumn",
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: false,
    choices: [
      {
        text: "Focus on reinforcing the defenses, but send scouts to verify the traveler's tales.",
        alignment: 'Solheart',
        nextScene: 'fortify_and_scout'
      },
      {
        text: "Use the information to propose a preemptive strike, arguing that attack is the best defense.",
        alignment: 'Myrkrider',
        nextScene: 'preemptive_strike'
      },
      {
        text: "Invite the traveler to share his tales with the village elders, seeking their counsel.",
        alignment: 'Ljosbearer',
        nextScene: 'elder_council'
      },
      {
        text: "Secretly meet with the traveler to gather more detailed information before deciding.",
        alignment: 'Skuggasmith',
        nextScene: 'secret_meeting'
      }
    ]
  },
  lindisfarne_raid_planning: {
    id: 'lindisfarne_raid_planning',
    text: "The village is a flurry of activity as preparations for the raid on Lindisfarne begin. The rhythmic pounding of hammers echoes across the fjord as ships are made ready. Warriors sharpen their weapons, their excitement palpable in the air. You stand at the center of it all, overseeing the preparations and making crucial decisions that will shape the outcome of this historic venture.",
    location: "Village Center",
    season: "Late Spring, 793 AD",
    storyPhase: StoryPhase.FIRST_RAIDS,
    isRequired: true,
    choices: [
      {
        text: "Focus on swift, overwhelming force to ensure victory and maximize plunder.",
        alignment: 'Myrkrider',
        nextScene: 'raid_execution'
      },
      {
        text: "Plan a more measured approach, aiming to minimize bloodshed while still achieving your goals.",
        alignment: 'Skuggasmith',
        nextScene: 'raid_execution'
      },
      {
        text: "Secretly approach some warriors about the possibility of settlement after the raid.",
        alignment: 'Solheart',
        nextScene: 'settlement_conspiracy'
      },
      {
        text: "Propose leaving some villagers behind to establish trade relations after the raid.",
        alignment: 'Ljosbearer',
        nextScene: 'raid_and_trade'
      }
    ]
  },
  raid_execution: {
    id: 'raid_execution',
    text: "The morning mist clings to the surface of the sea as your ships approach Lindisfarne. The island looms before you, its monastery standing tall against the dawn sky. The monks, unaware of the approaching danger, begin their morning prayers. The moment of truth has arrived. Your warriors look to you for the final command, their hands gripping their weapons tightly, ready to unleash the fury of the Northmen upon this unsuspecting shore.",
    location: "Shores of Lindisfarne",
    season: "Summer, June 8, 793 AD",
    storyPhase: StoryPhase.FIRST_RAIDS,
    isRequired: true,
    choices: [
      {
        text: "Give the order to attack with full force, showing no mercy.",
        alignment: 'Myrkrider',
        nextScene: 'ruthless_raid'
      },
      {
        text: "Signal for a more restrained approach, focusing on plunder over violence.",
        alignment: 'Skuggasmith',
        nextScene: 'calculated_raid'
      },
      {
        text: "At the last moment, propose a peaceful parley to demand tribute instead of raiding.",
        alignment: 'Ljosbearer',
        nextScene: 'unexpected_parley'
      },
      {
        text: "Lead a small group to secure the monastery's defenses, turning it into a potential outpost.",
        alignment: 'Solheart',
        nextScene: 'strategic_takeover'
      }
    ]
  },
  diplomatic_outreach: {
    id: 'diplomatic_outreach',
    text: "Months have passed since the raid on Lindisfarne, and your proposal to use its success for diplomatic leverage has borne fruit. You find yourself in a grand mead hall, far from home, surrounded by the unfamiliar sights and sounds of a Saxon kingdom. The air is thick with the scent of roasted meats and sweet mead, mingling with the smoke from the central hearth. Across the table sits King Aella of Northumbria, his eyes sharp and calculating as he considers your words. The tension in the room is palpable; your reputation as fierce raiders precedes you, but so does the wealth you've brought as a gesture of goodwill. The fate of future relations between your people and the Saxons hangs in the balance.",
    location: "Royal Mead Hall, Northumbria",
    season: "Winter, 794 AD",
    storyPhase: StoryPhase.EXPANSION,
    isRequired: false,
    choices: [
      {
        text: "Emphasize the mutual benefits of trade, offering access to Norse goods and seafaring expertise.",
        alignment: 'Ljosbearer',
        nextScene: 'trade_agreement'
      },
      {
        text: "Subtly remind the king of your military prowess, implying it would be wiser to have you as allies than enemies.",
        alignment: 'Skuggasmith',
        nextScene: 'uneasy_alliance'
      },
      {
        text: "Propose a cultural exchange, offering to host Saxon nobles in your village to foster understanding.",
        alignment: 'Solheart',
        nextScene: 'cultural_exchange'
      },
      {
        text: "Demand tribute in exchange for peace, asserting dominance over the Saxon kingdom.",
        alignment: 'Myrkrider',
        nextScene: 'tribute_demand'
      }
    ]
  },
  fortification_project: {
    id: 'fortification_project',
    text: "The village bustles with activity as your plans to improve defenses take shape. The air rings with the sound of axes biting into wood and the grunts of laborers hauling stones. A half-finished wooden watchtower looms over the village entrance, while trenches are being dug along the perimeter. The scent of fresh-cut timber mingles with the salt air. Villagers debate the merits of various defensive strategies, their voices a mix of excitement and concern. As you oversee the work, you can't help but wonder if these preparations will be enough to face the uncertain future that lies ahead.",
    location: "Coastal Norse Village",
    season: "Late Autumn, 792 AD",
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: false,
    choices: [
      {
        text: "Focus on building a stone wall around the village, prioritizing long-term security.",
        alignment: 'Solheart',
        nextScene: 'stone_wall_construction'
      },
      {
        text: "Invest in training villagers in combat techniques, believing that skilled defenders are the best fortification.",
        alignment: 'Myrkrider',
        nextScene: 'combat_training_program'
      },
      {
        text: "Establish a network of lookout posts along the coast, emphasizing early warning over physical defenses.",
        alignment: 'Skuggasmith',
        nextScene: 'coastal_lookout_network'
      },
      {
        text: "Propose integrating natural defenses, like strategic tree planting and manipulating the landscape.",
        alignment: 'Ljosbearer',
        nextScene: 'natural_fortifications'
      }
    ]
  },
  gather_supporters: {
    id: 'gather_supporters',
    text: "The longhouse buzzes with hushed conversations and the crackle of the central hearth. Shadows dance on rough-hewn wooden walls adorned with shields and tapestries depicting great deeds of the past. The air is thick with the scent of smoke, mead, and anticipation. You move among the gathered villagers, your eyes scanning faces both familiar and new. Some nod in respect, others watch warily. The harvest has been lean, and whispers of change ripple through the crowd like wind through summer wheat. As a respected member of the community, you sense the opportunity to shape the village's future. But with opportunity comes risk – every word, every promise could tip the delicate balance of power and loyalty.",
    location: "Great Longhouse of Ravnholm",
    season: "Late Autumn, 792 AD",
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: false,
    choices: [
      {
        text: "Appeal to the villagers' sense of tradition and stability, emphasizing the importance of unity in facing challenges.",
        alignment: 'Solheart',
        nextScene: 'unity_speech'
      },
      {
        text: "Quietly approach influential individuals, offering them personal benefits in exchange for their support.",
        alignment: 'Skuggasmith',
        nextScene: 'clandestine_deals'
      },
      {
        text: "Propose a communal project to improve the village, fostering cooperation and shared purpose.",
        alignment: 'Ljosbearer',
        nextScene: 'community_project'
      },
      {
        text: "Stir up discontent against current leadership, positioning yourself as a strong alternative who will bring glory and wealth.",
        alignment: 'Myrkrider',
        nextScene: 'leadership_challenge'
      }
    ]
  },
  local_trade_focus: {
    id: 'local_trade_focus',
    text: "The bustling marketplace of Kaupang hums with activity as traders from neighboring villages and distant lands hawk their wares. The air is thick with the scent of smoked fish, fresh bread, and exotic spices. Colorful awnings shelter stalls brimming with furs, amber, and intricately carved items. Your gaze sweeps over the scene, noting the mix of familiar faces and strangers, each representing a potential alliance or opportunity. As a respected member of the community, your decision on how to approach trade relations could shape the future of your village. The challenge lies in balancing immediate needs with long-term prosperity, all while navigating the complex web of loyalties and rivalries that define your world.",
    location: "Kaupang Marketplace, Southern Norway",
    season: "Late Summer, 793 AD",
    storyPhase: StoryPhase.PEACEFUL_BEGINNINGS,
    isRequired: false,
    choices: [
      {
        text: "Propose a trade agreement with neighboring villages, focusing on mutual benefit and shared resources.",
        alignment: 'Ljosbearer',
        nextScene: 'village_alliance'
      },
      {
        text: "Secretly negotiate exclusive deals with powerful merchants, securing personal wealth and influence.",
        alignment: 'Skuggasmith',
        nextScene: 'merchant_conspiracy'
      },
      {
        text: "Invest in local craftsmanship and agriculture to reduce dependence on external trade.",
        alignment: 'Solheart',
        nextScene: 'self_sufficiency'
      },
      {
        text: "Use your influence to manipulate trade routes, redirecting wealth to your village at the expense of others.",
        alignment: 'Myrkrider',
        nextScene: 'trade_domination'
      }
    ]
  }
}


