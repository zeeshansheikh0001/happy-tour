import { UaeActivity, UaeActivityCategory } from '../types/staticData';

const photo = (id: string) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`;

const SKYLINE = photo('photo-1512453979798-5ea266f8880c');
const BURJ_AL_ARAB = photo('photo-1518684079-3c830dcef090');
const PALM = photo('photo-1489516408517-0c0a15662682');
const POOL = photo('photo-1744413723378-57a12d15a6d8');
const DESERT = photo('photo-1677836292241-42a980172dd9');
const DHOW = photo('photo-1643636179992-fb7ec5541076');
const MOSQUE = photo('photo-1578895101408-1a36b834405b');
const AQUARIUM = photo('photo-1502998732392-615e9b445fa4');
const DIVE = photo('photo-1544551763-46a013bb70d5');
const BEACH = photo('photo-1507525428034-b723cf961d3e');
const BALLOON = photo('photo-1507608616759-54f48f0af0ee');
const MOUNTAINS = photo('photo-1506905925346-21bda4d32df4');
const RESORT = photo('photo-1566073771259-6a8506099945');
const FLIGHT = photo('photo-1436491865332-7a61a109cc05');
const GREEN = photo('photo-1614056965546-42fbe24eb36c');

const MATCHES: Array<[RegExp, string]> = [
    [/burj al arab/, BURJ_AL_ARAB],
    [/balloon/, BALLOON],
    [/helicopter/, FLIGHT],
    [/burj khalifa|dubai frame|ain dubai|sky views|fountain|skyline/, SKYLINE],
    [/palm|atlantis|aquaventure/, PALM],
    [/dhow|abra|creek/, DHOW],
    [/yacht|cruise|speedboat|boat|fishing|sailing|marina/, BURJ_AL_ARAB],
    [/mosque|sheikh zayed|qasr|palace|abrahamic|fort|heritage|souk|museum|wisdom|watchtower|old town|archaeolog|camel market/, MOSQUE],
    [/aquarium|dolphin|underwater zoo|deep dive/, AQUARIUM],
    [/scuba|snorkel|diving|dive/, DIVE],
    [/desert|dune|safari|quad|buggy|sandboard|camel|bedouin|stargaz|liwa|mleiha|big red/, DESERT],
    [/beach|corniche/, BEACH],
    [/jebel|hatta|hajar|wadi|mountain|hik|jais|ferrata|zipline|ropes|sledder|biking|bike/, MOUNTAINS],
    [/kayak|paddle|mangrove|lagoon|oasis|garden|butterfly|wildlife|bird|falcon|zoo/, GREEN],
    [/ski dubai|snow abu/, MOUNTAINS],
    [/waterpark|wild wadi|yas water|dreamland/, POOL],
    [/jet ski|wakeboard|parasail|banana|donut|flyboard|water ski|surf/, BEACH],
    [/food|dining|tasting|bbq/, DESERT],
    [/mall|shopping|market/, SKYLINE],
    [/golf|resort|hotel/, RESORT],
    [/kart|autodrome|ferrari|circuit|warner|legoland|motiongate|img worlds|seaworld|theme/, PALM],
    [/camp/, DESERT],
];

const CATEGORY_IMAGE: Record<UaeActivityCategory, string> = {
    sightseeing: SKYLINE,
    desert: DESERT,
    'water-sports': BEACH,
    'yacht-cruise': DHOW,
    mountain: MOUNTAINS,
    'theme-parks': PALM,
    extreme: MOUNTAINS,
    diving: DIVE,
    culture: MOSQUE,
    nature: GREEN,
    beaches: BEACH,
    aerial: BALLOON,
    food: DESERT,
    family: AQUARIUM,
};

export const activityThumbnail = (activity: UaeActivity) => {
    const title = activity.title.toLowerCase();
    const match = MATCHES.find(([pattern]) => pattern.test(title));
    return match ? match[1] : CATEGORY_IMAGE[activity.category];
};
