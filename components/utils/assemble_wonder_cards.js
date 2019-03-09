// Ancient 
import AngkorWat from '../game/cards/wonders/ancients/AngkorWat.js';
import BolshoiTheater from '../game/cards/wonders/ancients/BolshoiTheater.js';
import BrandenburgGate from '../game/cards/wonders/ancients/BrandenburgGate.js';
import ChichenItza from '../game/cards/wonders/ancients/ChichenItza.js';
import ColossusOfRhodes from '../game/cards/wonders/ancients/ColossusOfRhodes.js';
import Coricancha from '../game/cards/wonders/ancients/Coricancha.js';
import EdinburghCastle from '../game/cards/wonders/ancients/EdinburghCastle.js';
import GreatLibraryAlexandria from '../game/cards/wonders/ancients/GreatLibraryAlexandria.js';
import GreatWall from '../game/cards/wonders/ancients/GreatWall.js';
import HangingGardensofBabylon from '../game/cards/wonders/ancients/HangingGardensofBabylon.js';
import HawaMahal from '../game/cards/wonders/ancients/HawaMahal.js';
import HimejiCastle from '../game/cards/wonders/ancients/HimejiCastle.js';
import LighthouseofAlexandria from '../game/cards/wonders/ancients/LighthouseofAlexandria.js';
import MachuPicchu from '../game/cards/wonders/ancients/MachuPicchu.js';
import MausoleumAtHalicarnassus from '../game/cards/wonders/ancients/MausoleumAtHalicarnassus.js';
import MoaiofRapaNui from '../game/cards/wonders/ancients/MoaiofRapaNui.js';
import NazcaLines from '../game/cards/wonders/ancients/NazcaLines.js';
import NotreDame from '../game/cards/wonders/ancients/NotreDame.js';
import PalaceofVersailles from '../game/cards/wonders/ancients/PalaceofVersailles.js';
import Petra from '../game/cards/wonders/ancients/Petra.js';
import StatueofZeus from '../game/cards/wonders/ancients/StatueofZeus.js';
import Stjerneborg from '../game/cards/wonders/ancients/Stjerneborg.js';
import StoneHenge from '../game/cards/wonders/ancients/StoneHenge.js';
import TajMahal from '../game/cards/wonders/ancients/TajMahal.js';
import TempleofArtemis from '../game/cards/wonders/ancients/TempleofArtemis.js';
import TheColosseum from '../game/cards/wonders/ancients/TheColosseum.js';
import ThePyramids from '../game/cards/wonders/ancients/ThePyramids.js';

// Natural
import AmazonRainforest from '../game/cards/wonders/natural/AmazonRainforest.js';
import BluePools from '../game/cards/wonders/natural/BluePools.js';
import GreatBarrierReef from '../game/cards/wonders/natural/GreatBarrierReef.js';
import GuilinKarsts from '../game/cards/wonders/natural/GuilinKarsts.js';
import Gulfoss from '../game/cards/wonders/natural/Gulfoss.js';
import LakeBaikal from '../game/cards/wonders/natural/LakeBaikal.js';
import MilfordSound from '../game/cards/wonders/natural/MilfordSound.js';
import MtFuji from '../game/cards/wonders/natural/MtFuji.js';
import NileRiverDelta from '../game/cards/wonders/natural/NileRiverDelta.js';
import PlitviceLakes from '../game/cards/wonders/natural/PlitviceLakes.js';
import Preikestolen from '../game/cards/wonders/natural/Preikestolen.js';
import Serengeti from '../game/cards/wonders/natural/Serengeti.js';
import TheDeadSea from '../game/cards/wonders/natural/TheDeadSea.js';
import TheGrandCanyon from '../game/cards/wonders/natural/TheGrandCanyon.js';
import TheMatterhorn from '../game/cards/wonders/natural/TheMatterhorn.js';
import TongariroNationalPark from '../game/cards/wonders/natural/TongariroNationalPark.js';
import TsingydeBemaraha from '../game/cards/wonders/natural/TsingydeBemaraha.js';
import VictoriaFalls from '../game/cards/wonders/natural/VictoriaFalls.js';
import YellowstoneNationalPark from '../game/cards/wonders/natural/YellowstoneNationalPark.js';
import YosemiteNationalPark from '../game/cards/wonders/natural/YosemiteNationalPark.js';

// Modern
import BigBen from '../game/cards/wonders/moderns/BigBen.js';
import CCTV from '../game/cards/wonders/moderns/CCTV.js';
import CERN from '../game/cards/wonders/moderns/CERN.js';
import EiffelTower from '../game/cards/wonders/moderns/EiffelTower.js';
import GoldenGateBridge from '../game/cards/wonders/moderns/GoldenGateBridge.js';
import HumanGenomeProject from '../game/cards/wonders/moderns/HumanGenomeProject.js';
import ISS from '../game/cards/wonders/moderns/ISS.js';
import Louvre from '../game/cards/wonders/moderns/Louvre.js';
import ManhattanProject from '../game/cards/wonders/moderns/ManhattanProject.js';
import NeuschwansteinCastle from '../game/cards/wonders/moderns/NeuschwansteinCastle.js';
import NewYorkStockExchange from '../game/cards/wonders/moderns/NewYorkStockExchange.js';
import SagradaFamilia from '../game/cards/wonders/moderns/SagradaFamilia.js';
import SpaceRace from '../game/cards/wonders/moderns/SpaceRace.js';
import StatueofLiberty from '../game/cards/wonders/moderns/StatueofLiberty.js';
import SuezCanal from '../game/cards/wonders/moderns/SuezCanal.js';
import SydneyOperaHouse from '../game/cards/wonders/moderns/SydneyOperaHouse.js';
import Taipei101 from '../game/cards/wonders/moderns/Taipei101.js';
import TheChunnel from '../game/cards/wonders/moderns/TheChunnel.js';
import TheInternet from '../game/cards/wonders/moderns/TheInternet.js';
import ThePentagon from '../game/cards/wonders/moderns/ThePentagon.js';
import UnifiedCurrency from '../game/cards/wonders/moderns/UnifiedCurrency.js';
import UnitedNations from '../game/cards/wonders/moderns/UnitedNations.js';
import VictoriaHarbour from '../game/cards/wonders/moderns/VictoriaHarbour.js';

// Starter things
import AgeofEnlightenment from '../game/cards/starters/AgeofEnlightenment.js';
import ElectWorldLeader from '../game/cards/starters/ElectWorldLeader.js';

import { shuffle } from './utilities.js';

const assembleWonderDeck = (playersCount) => {
    let ancients = [
        AngkorWat,
        BolshoiTheater,
        BrandenburgGate,
        ChichenItza,
        ColossusOfRhodes,
        Coricancha,
        EdinburghCastle,
        GreatLibraryAlexandria,
        GreatWall,
        HangingGardensofBabylon,
        HawaMahal,
        HimejiCastle,
        LighthouseofAlexandria,
        MachuPicchu,
        MausoleumAtHalicarnassus,
        MoaiofRapaNui,
        NazcaLines,
        NotreDame,
        PalaceofVersailles,
        Petra,
        StatueofZeus,
        Stjerneborg,
        StoneHenge,
        TajMahal,
        TempleofArtemis,
        TheColosseum,
        ThePyramids,
    ];

    let moderns = [
        BigBen,
        CCTV,
        CERN,
        EiffelTower,
        GoldenGateBridge,
        HumanGenomeProject,
        ISS,
        Louvre,
        ManhattanProject,
        NeuschwansteinCastle,
        NewYorkStockExchange,
        SagradaFamilia,
        SpaceRace,
        StatueofLiberty,
        SuezCanal,
        SydneyOperaHouse,
        Taipei101,
        TheChunnel,
        TheInternet,
        ThePentagon,
        UnifiedCurrency,
        UnitedNations,
        VictoriaHarbour,
    ];

    let naturals = [
        AmazonRainforest,
        BluePools,
        GreatBarrierReef,
        GuilinKarsts,
        Gulfoss,
        LakeBaikal,
        MilfordSound,
        MtFuji,
        NileRiverDelta,
        PlitviceLakes,
        Preikestolen,
        Serengeti,
        TheDeadSea,
        TheGrandCanyon,
        TheMatterhorn,
        TongariroNationalPark,
        TsingydeBemaraha,
        VictoriaFalls,
        YellowstoneNationalPark,
        YosemiteNationalPark,
    ];

    const setupWonders = {
        '2': {
            ancient: 13, 
            modern: 9, 
        }, 
        '3': {
            ancient: 7, 
            modern: 3, 
        }, 
        '4': {
            ancient: 0, 
            modern: 0, 
        }, 
        '5': {
            ancient: 0, 
            modern: 0, 
        }, 
    }

    ancients = shuffle(ancients);
    moderns = shuffle(moderns); 
    naturals = shuffle(naturals);

    let wonderSupply = [];

    wonderSupply.push(ElectWorldLeader);

    for(let i = 0; i < (moderns.length - setupWonders[playersCount].modern); i++){
        wonderSupply.push(moderns[i]);
    }

    wonderSupply.push(AgeofEnlightenment);

    for(let i = 0; i < (ancients.length - setupWonders[playersCount].ancient); i++){
        wonderSupply.push(ancients[i]);
    }

    return {
        wonderSupply, 
        naturalWonders: naturals
    };
}

export default assembleWonderDeck;