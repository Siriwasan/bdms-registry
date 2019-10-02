export interface IntraCoronaryDevice {
  id: number;
  deviceName: string;
  deviceType: string;
  brand: string;
}

export const intraCoronaryDevices = [
  { id: 1, deviceName: 'Blinded - Device type unknown', deviceType: 'Other', brand: 'Not Specified' },
  { id: 2, deviceName: 'Place Holder - Device not in list', deviceType: 'Other', brand: 'Not Specified' },
  { id: 3, deviceName: 'Atherectomy - Peripheral (any mfr)', deviceType: 'Atherectomy', brand: 'Not Specified' },
  { id: 4, deviceName: 'Balloon - Peripheral (any mfr)', deviceType: 'Balloon', brand: 'Not Specified' },
  { id: 5, deviceName: 'Balloon from deployed stent', deviceType: 'Balloon', brand: 'Not Specified' },
  {
    id: 6,
    deviceName: 'Embolic Protection - Peripheral (any mfr)',
    deviceType: 'Embolic Protection',
    brand: 'Not Specified'
  },
  {
    id: 7,
    deviceName: 'Extraction Catheter - Peripheral (any mfr)',
    deviceType: 'Extraction Catheter',
    brand: 'Not Specified'
  },
  { id: 8, deviceName: 'Laser', deviceType: 'Laser', brand: 'Not Specified' },
  { id: 9, deviceName: 'Stent - Peripheral (any mfr)', deviceType: 'Bare Metal Stent', brand: 'Not Specified' },
  {
    id: 10,
    deviceName: 'Thrombectomy Catheter - Peripheral (any mfr)',
    deviceType: 'Thrombectomy',
    brand: 'Not Specified'
  },
  { id: 11, deviceName: 'ASAHI - Tornus', deviceType: 'Chronic Total Occlusion', brand: 'Abbott Vascular Devices' },
  {
    id: 12,
    deviceName: 'CROSSSAIL Coronary Dilatation Catheter',
    deviceType: 'Balloon',
    brand: 'Abbott Vascular Devices'
  },
  { id: 13, deviceName: 'FLEXI-CUT Atherectomy', deviceType: 'Atherectomy', brand: 'Abbott Vascular Devices' },
  {
    id: 14,
    deviceName: 'HIGHSAIL Coronary Dilatation Catheter',
    deviceType: 'Balloon',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 15,
    deviceName: 'Jostent Coronary Stent Graft',
    deviceType: 'Bare Metal Stent',
    brand: 'Abbott Vascular Devices'
  },
  { id: 16, deviceName: 'Jostent GraftMaster OTW', deviceType: 'Covered Stent', brand: 'Abbott Vascular Devices' },
  { id: 17, deviceName: 'Merlin PTCA Catheter (OTW)', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  {
    id: 18,
    deviceName: 'Multi-Link Mini Vision OTW Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 19,
    deviceName: 'Multi-Link Mini Vision RX Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 20,
    deviceName: 'Multi-Link Pixel Stent OTW',
    deviceType: 'Bare Metal Stent',
    brand: 'Abbott Vascular Devices'
  },
  { id: 21, deviceName: 'Multi-Link Pixel Stent RX', deviceType: 'Bare Metal Stent', brand: 'Abbott Vascular Devices' },
  {
    id: 22,
    deviceName: 'Multi-Link Ultra Stent - OTW',
    deviceType: 'Bare Metal Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 23,
    deviceName: 'Multi-Link Ultra Stent - RX',
    deviceType: 'Bare Metal Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 24,
    deviceName: 'Multi-Link Vision OTW Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 25,
    deviceName: 'Multi-Link Vision RX Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Abbott Vascular Devices'
  },
  { id: 26, deviceName: 'NC Merlin PTCA Catheter (OTW)', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  {
    id: 27,
    deviceName: 'OPENSAIL Coronary Dilatation Catheter',
    deviceType: 'Balloon',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 28,
    deviceName: 'POWERSAIL Coronary Dilatation Catheter',
    deviceType: 'Balloon',
    brand: 'Abbott Vascular Devices'
  },
  { id: 29, deviceName: 'Voyager OTW Balloon', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  {
    id: 30,
    deviceName: 'Voyager Rx Coronary Dilation Catheter',
    deviceType: 'Balloon',
    brand: 'Abbott Vascular Devices'
  },
  { id: 31, deviceName: 'Metricath Gemini Catheter', deviceType: 'Balloon', brand: 'Angiometrx' },
  { id: 32, deviceName: 'Angiosculpt Scoring Balloon Catheter', deviceType: 'Cutting Balloon', brand: 'Angioscore' },
  { id: 33, deviceName: 'Trerotola PTD Rotator Drive Unit', deviceType: 'Atherectomy', brand: 'Arrow' },
  {
    id: 34,
    deviceName: 'BioDivYsio Stents (phosphorylcholine)',
    deviceType: 'Coated Stent',
    brand: 'Biocompatibles Ltd'
  },
  { id: 35, deviceName: 'Transluminal Extraction Catheter (TEC)', deviceType: 'Extraction Catheter', brand: 'Biomed' },
  { id: 36, deviceName: 'Rithron-XR Coronary Stent System', deviceType: 'Coated Stent', brand: 'Biotronik' },
  {
    id: 37,
    deviceName: 'Tenax-XR Amorphous Silicon Carb. Coated Stent',
    deviceType: 'Coated Stent',
    brand: 'Biotronik'
  },
  { id: 38, deviceName: 'Teneo coronary stent', deviceType: 'Bare Metal Stent', brand: 'Biotronik' },
  { id: 39, deviceName: 'Ace Balloon', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 40, deviceName: 'Andante Balloon', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  {
    id: 41,
    deviceName: 'BeStent2 w/ Discrete Tech OTW Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 42,
    deviceName: 'Champion DES (Everlimus)',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 43,
    deviceName: 'Cutting Balloon Ultra Monorail',
    deviceType: 'Cutting Balloon',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 44,
    deviceName: 'Cutting Balloon Ultra OTW',
    deviceType: 'Cutting Balloon',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 45,
    deviceName: 'Cutting Balloon Ultra2 (OTW)',
    deviceType: 'Cutting Balloon',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 46,
    deviceName: 'Cutting Balloon Ultra2 Monorail',
    deviceType: 'Cutting Balloon',
    brand: 'Boston Scientific Corporation'
  },
  { id: 47, deviceName: 'Express2 OTW stent', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  { id: 48, deviceName: 'Express2 RE stent', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  {
    id: 49,
    deviceName: 'FilterWire EX Emoblic Protection System',
    deviceType: 'Embolic Protection',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 50,
    deviceName: 'FilterWire EZ Embolic Protection System',
    deviceType: 'Embolic Protection',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 51,
    deviceName: 'Flextome Cutting Balloon Monorail',
    deviceType: 'Cutting Balloon',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 52,
    deviceName: 'Flextome Cutting Balloon OTW',
    deviceType: 'Cutting Balloon',
    brand: 'Boston Scientific Corporation'
  },
  { id: 53, deviceName: 'FX miniRAIL Rx PTCA', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 54, deviceName: 'Galileo III', deviceType: 'Brachy Therapy', brand: 'Boston Scientific Corporation' },
  { id: 55, deviceName: 'Graft Ace Balloon', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 56, deviceName: 'L Ranger OTW Balloon', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 57, deviceName: 'Liberte OTW Stent', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  { id: 58, deviceName: 'Liberte RE Stent', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  { id: 59, deviceName: 'Long Ace Balloon', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  {
    id: 60,
    deviceName: 'Magic WALLSTENT Self Expanding Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 61, deviceName: 'Maverick OTW Balloon', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  {
    id: 62,
    deviceName: 'Maverick XL Monorail  RE Balloon',
    deviceType: 'Balloon',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 63,
    deviceName: 'Maverick(2) Monorail Balloon RE',
    deviceType: 'Balloon',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 64,
    deviceName: 'Multi-Link OTW ZETA Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 65,
    deviceName: 'Multi-Link PENTA Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 66,
    deviceName: 'Multi-Link RX ZETA Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 67,
    deviceName: 'Multi-Link TETRA Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 68, deviceName: 'NC Monorail Balloon RE', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 69, deviceName: 'NC Ranger OTW Balloon', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  {
    id: 70,
    deviceName: 'NIR Elite Monorail RE Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 71, deviceName: 'NIR Elite OTW Stent', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  { id: 72, deviceName: 'Pivot Balloon Catheter', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 73, deviceName: 'Quantum Maverick OTW Balloon', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 74, deviceName: 'Quantum Maverick RE Balloon', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  {
    id: 75,
    deviceName: 'Radius Self Expanding Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 76,
    deviceName: 'Rio Aspiration Catheter',
    deviceType: 'Extraction Catheter',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 77,
    deviceName: 'Rotablator rotational atherectomy system',
    deviceType: 'Atherectomy',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 78,
    deviceName: 'RX ESPRIT Coronary Dilation Balloon',
    deviceType: 'Balloon',
    brand: 'Boston Scientific Corporation'
  },
  { id: 79, deviceName: 'SLK-View', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  {
    id: 80,
    deviceName: 'Surpass Superfusion Perfusion Catheter',
    deviceType: 'Balloon',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 81,
    deviceName: 'Symbiot Covered Stent (ePTFE polymer)',
    deviceType: 'Covered Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 82,
    deviceName: 'Taxus Express 2 Monorail Drug Eluting Stent',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 83,
    deviceName: 'Taxus Express 2 OTW Drug Eluting Stent',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 84,
    deviceName: 'Taxus Liberte Paclitaxel-Eluting Stent',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 85, deviceName: 'Accent Balloon', deviceType: 'Balloon', brand: 'Cook Medical' },
  { id: 86, deviceName: 'DuraStar RX Balloon Catheter', deviceType: 'Balloon', brand: 'Cordis' },
  { id: 87, deviceName: 'FireStar RX Balloon Catheter', deviceType: 'Balloon', brand: 'Cordis' },
  { id: 88, deviceName: 'SpiderFX Embolic Protection', deviceType: 'Embolic Protection', brand: 'ev3 Inc.' },
  { id: 89, deviceName: 'SpideRx Embolic Protection', deviceType: 'Embolic Protection', brand: 'ev3 Inc.' },
  { id: 90, deviceName: 'X-Sizer', deviceType: 'Extraction Catheter', brand: 'ev3 Inc.' },
  { id: 91, deviceName: 'Rinspirator System', deviceType: 'Extraction Catheter', brand: 'FoxHollow Technologies' },
  {
    id: 92,
    deviceName: 'Silver Hawk Plaque Excision System',
    deviceType: 'Atherectomy',
    brand: 'FoxHollow Technologies'
  },
  { id: 93, deviceName: 'Diver CE', deviceType: 'Extraction Catheter', brand: 'Invatec' },
  { id: 94, deviceName: 'Tacrolimus Eluting Stent', deviceType: 'Drug Eluting Stent', brand: 'Janus' },
  { id: 95, deviceName: 'Bx SONIC OTW Stent', deviceType: 'Bare Metal Stent', brand: 'Johnson & Johnson' },
  { id: 96, deviceName: 'Bx SONIC OTW Stent with HEPACOAT', deviceType: 'Coated Stent', brand: 'Johnson & Johnson' },
  { id: 97, deviceName: 'Bx Velocity OTW Stent', deviceType: 'Bare Metal Stent', brand: 'Johnson & Johnson' },
  { id: 98, deviceName: 'Bx Velocity OTW Stent with HEPACOAT', deviceType: 'Coated Stent', brand: 'Johnson & Johnson' },
  { id: 99, deviceName: 'Bx Velocity Rx Stent', deviceType: 'Bare Metal Stent', brand: 'Johnson & Johnson' },
  { id: 100, deviceName: 'Bx Velocity RX Stent with HEPACOAT', deviceType: 'Coated Stent', brand: 'Johnson & Johnson' },
  { id: 101, deviceName: 'Checkmate', deviceType: 'Brachy Therapy', brand: 'Johnson & Johnson' },
  { id: 102, deviceName: 'CROSSFLEX LC Stent (OTW)', deviceType: 'Bare Metal Stent', brand: 'Johnson & Johnson' },
  {
    id: 103,
    deviceName: 'Cypher Sirolimus-eluting Stent (OTW)',
    deviceType: 'Drug Eluting Stent',
    brand: 'Johnson & Johnson'
  },
  {
    id: 104,
    deviceName: 'Cypher Sirolimus-eluting Stent (Rx)',
    deviceType: 'Drug Eluting Stent',
    brand: 'Johnson & Johnson'
  },
  {
    id: 105,
    deviceName: 'Frontrunner CTO Catheter',
    deviceType: 'Chronic Total Occlusion',
    brand: 'Johnson & Johnson'
  },
  { id: 106, deviceName: 'NC RAPTOR OTW PTCA', deviceType: 'Balloon', brand: 'Johnson & Johnson' },
  { id: 107, deviceName: 'Ninja FX OTW PTCA', deviceType: 'Balloon', brand: 'Johnson & Johnson' },
  { id: 108, deviceName: 'RAPTOR OTW PTCA', deviceType: 'Balloon', brand: 'Johnson & Johnson' },
  { id: 109, deviceName: 'RAPTORRAIL RE PTCA', deviceType: 'Balloon', brand: 'Johnson & Johnson' },
  { id: 110, deviceName: 'TITAN MEGA PTCA', deviceType: 'Balloon', brand: 'Johnson & Johnson' },
  {
    id: 111,
    deviceName: 'Intraluminal Safe-cross Catheter',
    deviceType: 'Chronic Total Occlusion',
    brand: 'Kensey Nash'
  },
  { id: 112, deviceName: 'QuickCat Extraction Catheter', deviceType: 'Extraction Catheter', brand: 'Kensey Nash' },
  { id: 113, deviceName: 'TriActiv', deviceType: 'Embolic Protection', brand: 'Kensey Nash' },
  { id: 114, deviceName: 'Xtract Catheter', deviceType: 'Extraction Catheter', brand: 'Lumen Biomedical' },
  { id: 115, deviceName: 'Metricath GPS Catheter', deviceType: 'Balloon', brand: 'Medical Ventures' },
  { id: 116, deviceName: 'Driver MX2 (RX)', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 117, deviceName: 'Driver OTW Coronary Stent', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 118, deviceName: 'Driver Zipper MX Coronary Stent', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 119, deviceName: 'Endeavor Stent (OTW)', deviceType: 'Drug Eluting Stent', brand: 'Medtronic' },
  { id: 120, deviceName: 'Endeavor Stent MX2', deviceType: 'Drug Eluting Stent', brand: 'Medtronic' },
  { id: 121, deviceName: 'Endeavor Stent RX', deviceType: 'Drug Eluting Stent', brand: 'Medtronic' },
  { id: 122, deviceName: 'Export Catheter', deviceType: 'Thrombectomy', brand: 'Medtronic' },
  { id: 123, deviceName: 'Export XT Catheter', deviceType: 'Thrombectomy', brand: 'Medtronic' },
  { id: 124, deviceName: 'GuardWire Temporary Occlusion', deviceType: 'Embolic Protection', brand: 'Medtronic' },
  { id: 125, deviceName: 'Micro Driver (OTW)', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 126, deviceName: 'Micro Driver MX2 (RX)', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 127, deviceName: 'NC Stormer OTW Balloon', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 128, deviceName: 'NC Stormer Zipper MX', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 129, deviceName: 'Percusurge', deviceType: 'Embolic Protection', brand: 'Medtronic' },
  { id: 130, deviceName: 'R Stent Prodigy', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  {
    id: 131,
    deviceName: 'S660 with Discrete Technology OTW Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Medtronic'
  },
  {
    id: 132,
    deviceName: 'S670 with Discrete Technology OTW Stent',
    deviceType: 'Bare Metal Stent',
    brand: 'Medtronic'
  },
  { id: 133, deviceName: 'S7 with Discrete Technology OTW Stent', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 134, deviceName: 'S7 Zipper MX Multi-Exchange Stent', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 135, deviceName: 'Sprinter Balloon', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 136, deviceName: 'Sprinter MX2 (RX)', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 137, deviceName: 'Sprinter OTW', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 138, deviceName: 'Stormer OTW Balloon', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 139, deviceName: 'Stormer Zipper MX', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 140, deviceName: 'Beta-Cath', deviceType: 'Brachy Therapy', brand: 'Novoste' },
  { id: 141, deviceName: 'R Stent Evolution', deviceType: 'Bare Metal Stent', brand: 'Orbus Medical Technologies' },
  {
    id: 142,
    deviceName: 'R Stent SVS (small vessel system)',
    deviceType: 'Bare Metal Stent',
    brand: 'Orbus Medical Technologies'
  },
  { id: 143, deviceName: 'Cardio-Path', deviceType: 'Thrombectomy', brand: 'Pathway Medical Technologies' },
  { id: 144, deviceName: 'AngioJet Xpeedior+120 Thrombectomy Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 145, deviceName: 'AVX Thrombectomy Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 146, deviceName: 'DVX Thrombectomy Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 147, deviceName: 'Fetch Aspiration Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 148, deviceName: 'Spiroflex', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 149, deviceName: 'Spiroflex Ultra', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 150, deviceName: 'Spiroflex VG Thrombectomy Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 151, deviceName: 'XMI Ultra Thrombectomy Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 152, deviceName: 'XMI-OTW Thrombectomy Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 153, deviceName: 'XMI-RX Thrombectomy Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 154, deviceName: 'XVG Thrombectomy Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 155, deviceName: 'XVG Ultra Thrombectomy Catheter', deviceType: 'Thrombectomy', brand: 'Possis' },
  { id: 156, deviceName: 'Viva Balloon', deviceType: 'Balloon', brand: 'SciMed Corp.' },
  { id: 157, deviceName: 'Quantum Ranger OTW Balloon', deviceType: 'Balloon', brand: 'SCIMED Life Systems' },
  {
    id: 158,
    deviceName: 'Proxis Embolic Protection System',
    deviceType: 'Embolic Protection',
    brand: 'St. Jude Medical'
  },
  { id: 159, deviceName: 'Pronto Extraction Catheter', deviceType: 'Extraction Catheter', brand: 'Vascular Solutions' },
  { id: 160, deviceName: 'Promus DES RX', deviceType: 'Drug Eluting Stent', brand: 'Boston Scientific Corporation' },
  { id: 161, deviceName: 'Promus DES OTW', deviceType: 'Drug Eluting Stent', brand: 'Boston Scientific Corporation' },
  { id: 162, deviceName: 'Xience DES RX', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  { id: 163, deviceName: 'Xience DES OTW', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  { id: 164, deviceName: 'NC Stormer MX2', deviceType: 'Balloon', brand: 'Medtronic' },
  {
    id: 165,
    deviceName: 'Taxus Express2 ATOM - OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 166,
    deviceName: 'Taxus Express2 ATOM - RX',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 167, deviceName: 'Voyager NC - OTW', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  { id: 168, deviceName: 'Voyager NC - RX', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  { id: 169, deviceName: 'LipiScan Coronary Imaging System', deviceType: 'Diagnostic', brand: 'InfraReDx Inc.' },
  {
    id: 170,
    deviceName: 'Taxus Liberte Stent - OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 171,
    deviceName: 'Taxus Liberte Stent - RX',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 172, deviceName: 'Apex Monorail', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 173, deviceName: 'Apex (OTW)', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 174, deviceName: 'Endeavor Sprint - RX', deviceType: 'Drug Eluting Stent', brand: 'Medtronic' },
  { id: 175, deviceName: 'NC Sprinter - RX', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 176, deviceName: 'Sprinter Legend - RX', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 177, deviceName: 'Driver RX', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 178, deviceName: 'Micro Driver RX', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 179, deviceName: 'Export AP Catheter', deviceType: 'Thrombectomy', brand: 'Medtronic' },
  { id: 180, deviceName: 'Endeavor Sprint - OTW', deviceType: 'Drug Eluting Stent', brand: 'Medtronic' },
  { id: 181, deviceName: 'Apex Monorail - Flex', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 182, deviceName: 'Apex Monorail - Push', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 183, deviceName: 'Apex OTW - Flex', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 184, deviceName: 'Apex OTW - Push', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 185, deviceName: 'Prime Wire', deviceType: 'Diagnostic', brand: 'Volcano Corporation' },
  { id: 186, deviceName: 'Pronto LP', deviceType: 'Extraction Catheter', brand: 'Vascular Solutions' },
  { id: 187, deviceName: 'Pronto V3', deviceType: 'Extraction Catheter', brand: 'Vascular Solutions' },
  {
    id: 188,
    deviceName: 'Taxus Liberte Atom - OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 189,
    deviceName: 'Taxus Liberte Atom - RX',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 190,
    deviceName: 'Xience V DES - OTW - Multilink Vision',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 191,
    deviceName: 'Xience V DES - RX - Multilink Vision',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 192,
    deviceName: 'Xience V DES - OTW - Multilink MiniVision',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 193,
    deviceName: 'Xience V DES - RX - Multilink MiniVision',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  { id: 194, deviceName: 'Sprinter Legend - OTW', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 195, deviceName: 'Export AP Catheter', deviceType: 'Thrombectomy', brand: 'Medtronic' },
  { id: 196, deviceName: 'VeriFLEX RX', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  { id: 197, deviceName: 'VeriFLEX OTW', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  {
    id: 198,
    deviceName: 'TAXUS Liberte Long Stent',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 199, deviceName: 'NC Quantum Apex Monorail', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 200, deviceName: 'NC Quantum Apex OTW', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 201, deviceName: 'Integrity OTW Coronary Stent', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 202, deviceName: 'Integrity RX Coronary Stent', deviceType: 'Bare Metal Stent', brand: 'Medtronic' },
  { id: 203, deviceName: 'Mini-Trek Rx', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  { id: 204, deviceName: 'Mini-Trek OTW', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  { id: 205, deviceName: 'Trek Rx', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  { id: 206, deviceName: 'Trek OTW', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  { id: 207, deviceName: 'Xpress-Way Rx', deviceType: 'Extraction Catheter', brand: 'Atrium' },
  { id: 208, deviceName: 'Pronto V4', deviceType: 'Extraction Catheter', brand: 'Vascular Solutions' },
  { id: 209, deviceName: 'ION Stent OTW', deviceType: 'Drug Eluting Stent', brand: 'Boston Scientific Corporation' },
  {
    id: 210,
    deviceName: 'ION Stent Monorail',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 211, deviceName: 'NC Trek OTW', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  { id: 212, deviceName: 'NC Trek Rx', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  { id: 213, deviceName: 'Xience Nano Rx', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  { id: 214, deviceName: 'ASAP', deviceType: 'Extraction Catheter', brand: 'Merit Medical' },
  {
    id: 215,
    deviceName: 'Promus Element RX',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 216,
    deviceName: 'Promus Element OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 217, deviceName: 'Xience Prime LL Rx', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  { id: 218, deviceName: 'Resolute Integrity Rx', deviceType: 'Drug Eluting Stent', brand: 'Medtronic' },
  { id: 219, deviceName: 'Resolute Integrity OTW', deviceType: 'Drug Eluting Stent', brand: 'Medtronic' },
  {
    id: 220,
    deviceName: 'Promus Element Plus Rx',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 221,
    deviceName: 'Promus Element Plus OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 222, deviceName: 'Empira Rx', deviceType: 'Balloon', brand: 'Cordis' },
  { id: 223, deviceName: 'Empira NC Rx', deviceType: 'Balloon', brand: 'Cordis' },
  {
    id: 224,
    deviceName: 'Crossboss CTO Catheter',
    deviceType: 'Chronic Total Occlusion',
    brand: 'Bridgepoint Medical'
  },
  { id: 225, deviceName: 'Stingray CTO Catheter', deviceType: 'Chronic Total Occlusion', brand: 'Bridgepoint Medical' },
  {
    id: 226,
    deviceName: 'Emerge PTCA Dilatation Catheter OTW',
    deviceType: 'Balloon',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 227,
    deviceName: 'Emerge PTCA Dilatation Catheter Monorail',
    deviceType: 'Balloon',
    brand: 'Boston Scientific Corporation'
  },
  { id: 228, deviceName: 'PriorityOne Aspiration Catheter', deviceType: 'Extraction Catheter', brand: 'Terumo' },
  { id: 229, deviceName: 'Multi-Link 8 LL Rx', deviceType: 'Bare Metal Stent', brand: 'Abbott Vascular Devices' },
  { id: 230, deviceName: 'Clearway Rx', deviceType: 'Balloon', brand: 'Atrium' },
  { id: 231, deviceName: 'Glider PTCA Balloon Catheter OTW', deviceType: 'Balloon', brand: 'TriReme Medical' },
  { id: 232, deviceName: 'Presillion Plus CoCr Coronary Stent Rx', deviceType: 'Bare Metal Stent', brand: 'Cordis' },
  {
    id: 233,
    deviceName: 'Xience Xpedition DES Rx',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 234,
    deviceName: 'Xience Xpedition DES OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 235,
    deviceName: 'Xience Xpedition LL DES OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 236,
    deviceName: 'Xience Xpedition LL DES Rx',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 237,
    deviceName: 'Xience Xpedition SV DES OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 238,
    deviceName: 'Xience Xpedition SV DES Rx',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  { id: 239, deviceName: 'Fetch?2 Aspiration Catheter', deviceType: 'Thrombectomy', brand: 'MEDRAD' },
  { id: 240, deviceName: 'BioMatrix Flex', deviceType: 'Drug Eluting Stent', brand: 'Biosensors' },
  { id: 241, deviceName: 'Fetch 2 Aspiration Catheter', deviceType: 'Thrombectomy', brand: 'MEDRAD' },
  { id: 242, deviceName: 'SeQuent Please Balloon', deviceType: 'Balloon', brand: 'BBraun' },
  { id: 243, deviceName: 'Self-Apposing Stent DES', deviceType: 'Drug Eluting Stent', brand: 'STENTYS' },
  { id: 244, deviceName: 'Self-Apposing Stent BMS', deviceType: 'Bare Metal Stent', brand: 'STENTYS' },
  { id: 245, deviceName: 'Export Advance Catheter', deviceType: 'Thrombectomy', brand: 'Medtronic' },
  { id: 246, deviceName: 'DIAMONDBACK 360', deviceType: 'Atherectomy', brand: 'Cardiovascular Systems' },
  { id: 247, deviceName: 'GRAFTMASTER RX Stent', deviceType: 'Covered Stent', brand: 'Abbott Vascular Devices' },
  {
    id: 248,
    deviceName: 'Promus PREMIER OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 249,
    deviceName: 'Promus PREMIER RX',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 250, deviceName: 'PRO-Kinetic Energy Stent OTW', deviceType: 'Drug Eluting Stent', brand: 'Biotronik' },
  { id: 251, deviceName: 'PRO-Kinetic Energy Stent RX', deviceType: 'Drug Eluting Stent', brand: 'Biotronik' },
  { id: 252, deviceName: 'AngioSculpt Taper', deviceType: 'Balloon', brand: 'Angioscore' },
  { id: 253, deviceName: 'Rebel Stent RX', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  { id: 254, deviceName: 'Rebel Stent OTW', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  { id: 255, deviceName: 'NC Euphora RX', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 256, deviceName: 'NC Euphora OTW', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 257, deviceName: 'Xience Alpine RX', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  { id: 258, deviceName: 'Xience Alpine OTW', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  { id: 259, deviceName: 'NC Mozec RX', deviceType: 'Balloon', brand: 'Meril Life Science' },
  { id: 260, deviceName: 'Chocolate Balloon RX', deviceType: 'Balloon', brand: 'TriReme Medical' },
  { id: 261, deviceName: 'Chocolate Balloon OTW', deviceType: 'Balloon', brand: 'TriReme Medical' },
  { id: 262, deviceName: 'NC Emerge RX', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 263, deviceName: 'NC Emerge OTW', deviceType: 'Balloon', brand: 'Boston Scientific Corporation' },
  { id: 264, deviceName: 'PRO-Kinetic Energy Stent RX', deviceType: 'Bare Metal Stent', brand: 'Biotronik' },
  { id: 265, deviceName: 'NIRxcell CoCr Stent RX', deviceType: 'Bare Metal Stent', brand: 'Medinol' },
  { id: 266, deviceName: 'SYNERGY Stent RX', deviceType: 'Drug Eluting Stent', brand: 'Boston Scientific Corporation' },
  {
    id: 267,
    deviceName: 'SYNERGY Stent OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 268, deviceName: 'Resolute Onyx Stent RX', deviceType: 'Drug Eluting Stent', brand: 'Medtronic' },
  {
    id: 269,
    deviceName: 'Resolute Onyx Stent OTW',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 270, deviceName: 'Resolute Onyx Stent OTW', deviceType: 'Drug Eluting Stent', brand: 'Medtronic' },
  {
    id: 271,
    deviceName: 'Threader Micro-Dilatation Balloon RX',
    deviceType: 'Balloon',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 272,
    deviceName: 'Threader Mico-Dilatation Balloon OTW',
    deviceType: 'Balloon',
    brand: 'Boston Scientific Corporation'
  },
  { id: 273, deviceName: 'Ryujin Plus Balloon OTW', deviceType: 'Balloon', brand: 'Terumo' },
  { id: 274, deviceName: 'OPN NC Balloon RX', deviceType: 'Balloon', brand: 'Swiss International Systems' },
  { id: 275, deviceName: 'ELCA  Coronary Laser Atherectomy Catheter RX', deviceType: 'Laser', brand: 'Spectranetics' },
  { id: 276, deviceName: 'ELCA Coronary Laser Atherectomy Catheter OTW', deviceType: 'Laser', brand: 'Spectranetics' },
  { id: 277, deviceName: 'NIC Nano CTO Balloon RX', deviceType: 'Balloon', brand: 'Vasculaperspectives' },
  { id: 278, deviceName: 'NIC Nano CTO Balloon OTW', deviceType: 'Balloon', brand: 'Vasculaperspectives' },
  { id: 279, deviceName: 'XPRESS-WAY Extraction Catheter RX', deviceType: 'Extraction Catheter', brand: 'Atrium' },
  { id: 280, deviceName: 'Magic Touch Balloon RX', deviceType: 'Coated Balloon', brand: 'Concept Medical' },
  { id: 281, deviceName: 'Euphora Balloon RX', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 282, deviceName: 'Euphora Balloon OTW', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 283, deviceName: 'Airtimes Balloon RX', deviceType: 'Balloon', brand: 'BrosMed Medical Products' },
  { id: 284, deviceName: 'Apollo NC Balloon RX', deviceType: 'Balloon', brand: 'BrosMed Medical Products' },
  {
    id: 285,
    deviceName: 'MegaVac Vaccum Extraction Catheter',
    deviceType: 'Thrombectomy',
    brand: 'Capture Vascular Inc'
  },
  {
    id: 286,
    deviceName: 'AngioJet Ultra Coronary ThrombectomySystem',
    deviceType: 'Thrombectomy',
    brand: 'Boston Scientific Corporation'
  },
  {
    id: 287,
    deviceName: 'DESyne Coronary Stent',
    deviceType: 'Drug Eluting Stent',
    brand: 'Elixir Medical Corporation'
  },
  {
    id: 288,
    deviceName: 'DESolve Bioresorbable Coronary Scaffold System',
    deviceType: 'Drug Eluting Stent',
    brand: 'Elixir Medical Corporation'
  },
  { id: 289, deviceName: 'Sapphire NC  Dilatation Catheter', deviceType: 'Balloon', brand: 'OrbusNeich' },
  { id: 290, deviceName: 'MGuard Embolic Protection Stent', deviceType: 'Other', brand: 'InspireMD' },
  { id: 291, deviceName: 'Yukon Choice Coronary Stent', deviceType: 'Drug Eluting Stent', brand: 'Translumina' },
  { id: 292, deviceName: 'Coroflex ISAR Coronary Stent', deviceType: 'Drug Eluting Stent', brand: 'BBraun' },
  { id: 293, deviceName: 'COMBO Dual Therapy Stent', deviceType: 'Drug Eluting Stent', brand: 'OrbusNeich' },
  {
    id: 294,
    deviceName: 'RotaLink Plus Rotational Atherectomy System',
    deviceType: 'Atherectomy',
    brand: 'Boston Scientific Corporation'
  },
  { id: 295, deviceName: 'Sapphire II NC Dilatation Catheter', deviceType: 'Balloon', brand: 'OrbusNeich' },
  { id: 296, deviceName: 'Azule Stent', deviceType: 'Bare Metal Stent', brand: 'OrbusNeich' },
  { id: 297, deviceName: 'Coroflex Blue NEO Stent', deviceType: 'Bare Metal Stent', brand: 'BBraun' },
  { id: 298, deviceName: 'Firebird2 Stent', deviceType: 'Drug Eluting Stent', brand: 'MicroPort' },
  { id: 299, deviceName: 'SatinFlex Stent', deviceType: 'Bare Metal Stent', brand: 'Clear Stream Technologies' },
  { id: 300, deviceName: 'AXXESS Bifurcated Stent System', deviceType: 'Drug Eluting Stent', brand: 'Devax Inc' },
  { id: 301, deviceName: 'Tazuna Balloon', deviceType: 'Balloon', brand: 'Terumo' },
  { id: 302, deviceName: 'Hiryu NC Balloon', deviceType: 'Balloon', brand: 'Terumo' },
  { id: 303, deviceName: 'Nobori Stent', deviceType: 'Drug Eluting Stent', brand: 'Terumo' },
  { id: 304, deviceName: 'Thrombuster II Extraction Catheter', deviceType: 'Thrombectomy', brand: 'Atrium' },
  {
    id: 305,
    deviceName: 'RotaLink Plus Rotational Atherectomy System',
    deviceType: 'Atherectomy',
    brand: 'Boston Scientific Corporation'
  },
  { id: 306, deviceName: 'Xience Prime SV Stent', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  {
    id: 307,
    deviceName: 'SYNERGY Bioabsorbable Stent',
    deviceType: 'Drug Eluting Stent',
    brand: 'Boston Scientific Corporation'
  },
  { id: 308, deviceName: 'Ultimaster Coronary Stent System', deviceType: 'Drug Eluting Stent', brand: 'Terumo' },
  { id: 309, deviceName: 'JIVE PTCA Balloon Catheter', deviceType: 'Balloon', brand: 'MicroPort' },
  { id: 310, deviceName: 'ACROSS CTO ST Balloon', deviceType: 'Balloon', brand: 'Acrostak' },
  { id: 311, deviceName: 'FORTIS II Balloon', deviceType: 'Balloon', brand: 'Kaneka Medical Products' },
  { id: 312, deviceName: 'IKAZUCHI X Balloon', deviceType: 'Balloon', brand: 'Kaneka Medical Products' },
  { id: 313, deviceName: 'Biofreedom Stent', deviceType: 'Drug Eluting Stent', brand: 'Biosensors' },
  { id: 314, deviceName: 'ProNOVA XR', deviceType: 'Drug Eluting Stent', brand: 'Vascular Innovation' },
  { id: 315, deviceName: 'Artimes SC', deviceType: 'Balloon', brand: 'US Endovascular' },
  { id: 316, deviceName: 'PathMaker PTCA Balloon Catheter', deviceType: 'Balloon', brand: 'Amsino Medical Co LTD' },
  { id: 317, deviceName: 'Omega BMS', deviceType: 'Bare Metal Stent', brand: 'Boston Scientific Corporation' },
  { id: 318, deviceName: 'Yukon Choice BMS Coronary Stent', deviceType: 'Bare Metal Stent', brand: 'Translumina' },
  { id: 319, deviceName: 'Nimbus PICO Mu PTCA', deviceType: 'Balloon', brand: 'Clear Stream Technologies' },
  { id: 320, deviceName: 'Xience Prime  Stent', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  { id: 321, deviceName: 'Pantera LEO Balloon Dilitation Catheter', deviceType: 'Balloon', brand: 'Biotronik' },
  {
    id: 322,
    deviceName: 'Scoreflex Balloon Dilitation Catheter',
    deviceType: 'Balloon',
    brand: 'Orbus Medical Technologies'
  },
  {
    id: 323,
    deviceName: 'Raiden 3 Balloon Dilitation Catheter',
    deviceType: 'Balloon',
    brand: 'Kaneka Medical Products'
  },
  { id: 324, deviceName: 'Foxtrot NC PTCA Balloon Dilitation Catheter', deviceType: 'Balloon', brand: 'MicroPort' },
  { id: 325, deviceName: 'Lacrosse NSE ALPHA Coronary Dilitation Catheter', deviceType: 'Balloon', brand: 'Goodman' },
  { id: 326, deviceName: 'Pantera LEO Balloon Catheter', deviceType: 'Balloon', brand: 'Biotronik' },
  { id: 327, deviceName: 'Scoreflex Balloon Catheter', deviceType: 'Balloon', brand: 'Orbus Medical Technologies' },
  { id: 328, deviceName: 'Raiden 3 Balloon Catheter', deviceType: 'Balloon', brand: 'Kaneka Medical Products' },
  { id: 329, deviceName: 'Foxtrot NC PTCA Balloon Catheter', deviceType: 'Balloon', brand: 'MicroPort' },
  { id: 330, deviceName: 'Lacrosse NSE ALPHA Coronary Catheter', deviceType: 'Balloon', brand: 'Goodman' },
  { id: 331, deviceName: 'Amadeus Supercross Coronary Dilatation Catheter', deviceType: 'Balloon', brand: 'Eurocor' },
  {
    id: 332,
    deviceName: 'Firehawk Rapamycin Target Eluting Coronary Stent System',
    deviceType: 'Drug Eluting Stent',
    brand: 'MicroPort'
  },
  {
    id: 333,
    deviceName: 'Orsiro Drug Eluting Stent System (BIOFLOW-II)',
    deviceType: 'Drug Eluting Stent',
    brand: 'Biotronik AG'
  },
  {
    id: 334,
    deviceName: 'Endeavor Resolute Zotarolimus Stent RX',
    deviceType: 'Drug Eluting Stent',
    brand: 'Medtronic'
  },
  { id: 335, deviceName: 'BioMatrix Alpha', deviceType: 'Drug Eluting Stent', brand: 'Biosensors' },
  { id: 336, deviceName: 'Eliminate Aspirate Catheter', deviceType: 'Thrombectomy', brand: 'Terumo' },
  { id: 337, deviceName: 'Chocolate XD PTCA Catheter', deviceType: 'Balloon', brand: 'TriReme Medical' },
  {
    id: 338,
    deviceName: 'Biomime Morph Sirolimus Eluting Stent',
    deviceType: 'Drug Eluting Stent',
    brand: 'Meril Life Science'
  },
  {
    id: 339,
    deviceName: 'Traveler coronary balloon dilatation catheter',
    deviceType: 'Balloon',
    brand: 'Abbott Vascular Devices'
  },
  {
    id: 340,
    deviceName: 'NC Traveler coronary balloon dilatation catheter',
    deviceType: 'Balloon',
    brand: 'Abbott Vascular Devices'
  },
  { id: 341, deviceName: 'Xience ProX', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  { id: 342, deviceName: 'Tryton Side Branch Stent', deviceType: 'Bare Metal Stent', brand: 'Cordis' },
  { id: 343, deviceName: 'MOZEC RX PTCA Balloon', deviceType: 'Balloon', brand: 'Meril Life Science' },
  { id: 344, deviceName: 'MOZEC NC PTCA Balloon', deviceType: 'Balloon', brand: 'Meril Life Science' },
  { id: 345, deviceName: 'Pantera Pro', deviceType: 'Balloon', brand: 'Biotronik' },
  { id: 346, deviceName: 'Pantera PRO Balloon', deviceType: 'Balloon', brand: 'Biotronik' },
  { id: 347, deviceName: 'MOZEC PTCA Balloon', deviceType: 'Balloon', brand: 'Cordis' },
  { id: 348, deviceName: 'Kaname Bare Metal Stent', deviceType: 'Bare Metal Stent', brand: 'Terumo' },
  { id: 349, deviceName: 'COBRA PzF NanoCoated', deviceType: 'Coated Stent', brand: 'CeloNova' },
  {
    id: 350,
    deviceName: 'ASPIRE Mechanical ASPIRATOR',
    deviceType: 'Thrombectomy',
    brand: 'Control Medical Technology'
  },
  { id: 351, deviceName: 'BEO NC Balloon', deviceType: 'Balloon', brand: 'Swiss International Systems' },
  {
    id: 352,
    deviceName: 'Galaxy Rapamycin Bioresorbable',
    deviceType: 'Drug Eluting Stent',
    brand: 'QUALIMED INNOVATIVE'
  },
  { id: 353, deviceName: '3V NEIL Sirolimus', deviceType: 'Drug Eluting Stent', brand: 'S3V Vascular Technologies' },
  {
    id: 354,
    deviceName: 'Trapper Balloon',
    deviceType: 'Chronic Total Occlusion',
    brand: 'Boston Scientific Corporation'
  },
  { id: 355, deviceName: 'Accuforce Non Compliant PTCA', deviceType: 'Balloon', brand: 'Terumo' },
  { id: 356, deviceName: 'INSIGNIA', deviceType: 'Drug Eluting Stent', brand: 'Innvolution Healthcare' },
  { id: 357, deviceName: 'EluNIR DES', deviceType: 'Drug Eluting Stent', brand: 'Medinol' },
  {
    id: 358,
    deviceName: 'Wolverine Cutting  Balloon',
    deviceType: 'Cutting Balloon',
    brand: 'Boston Scientific Corporation'
  },
  { id: 950, deviceName: 'Balloon', deviceType: 'Balloon', brand: 'Not Specified' },
  { id: 951, deviceName: 'Cutting Balloon', deviceType: 'Cutting Balloon', brand: 'Not Specified' },
  { id: 952, deviceName: 'Bare Metal Stent', deviceType: 'Bare Metal Stent', brand: 'Not Specified' },
  { id: 953, deviceName: 'Coated Stent', deviceType: 'Coated Stent', brand: 'Not Specified' },
  { id: 954, deviceName: 'Covered Stent', deviceType: 'Covered Stent', brand: 'Not Specified' },
  { id: 955, deviceName: 'Drug Eluting Stent', deviceType: 'Drug Eluting Stent', brand: 'Not Specified' },
  { id: 956, deviceName: 'Brachy Therapy', deviceType: 'Brachy Therapy', brand: 'Not Specified' },
  { id: 957, deviceName: 'Chronic Total Occlusion', deviceType: 'Chronic Total Occlusion', brand: 'Not Specified' },
  { id: 958, deviceName: 'Embolic Protection', deviceType: 'Embolic Protection', brand: 'Not Specified' },
  { id: 959, deviceName: 'Extraction Catheter', deviceType: 'Extraction Catheter', brand: 'Not Specified' },
  { id: 961, deviceName: 'Thrombectomy', deviceType: 'Thrombectomy', brand: 'Not Specified' },
  { id: 962, deviceName: 'Atherectomy', deviceType: 'Atherectomy', brand: 'Not Specified' },
  { id: 963, deviceName: 'Promus PREMIER', deviceType: 'Drug Eluting Stent', brand: 'Boston Scientific Corporation' },
  { id: 964, deviceName: 'MINI Trek II', deviceType: 'Balloon', brand: 'Abbott Vascular Devices' },
  { id: 965, deviceName: 'Corsair Microcatheter', deviceType: 'Chronic Total Occlusion', brand: 'Asahi' },
  {
    id: 966,
    deviceName: 'ReFLOW Aspiration Catheter',
    deviceType: 'Extraction Catheter',
    brand: 'Volcano Corporation'
  },
  { id: 967, deviceName: 'IN.PACT Falcon', deviceType: 'Balloon', brand: 'Medtronic' },
  { id: 968, deviceName: 'FLASH Ostial System RX', deviceType: 'Balloon', brand: 'Ostial Corporation' },
  {
    id: 969,
    deviceName: 'Absorb Bioresorbable Vascular Scaffold System',
    deviceType: 'Drug Eluting Stent',
    brand: 'Abbott Vascular Devices'
  },
  { id: 970, deviceName: 'Glider PTCA Balloon Catheter RX', deviceType: 'Balloon', brand: 'TriReme Medical' },
  { id: 971, deviceName: 'Xience Sierra DES', deviceType: 'Drug Eluting Stent', brand: 'Abbott Vascular Devices' },
  { id: 972, deviceName: 'Sapphire II Pro', deviceType: 'Balloon', brand: 'Orbus Medical Technologies' },
  { id: 973, deviceName: 'Takeru NC PTCA', deviceType: 'Balloon', brand: 'Terumo' },
  { id: 974, deviceName: 'Evermine 50', deviceType: 'Drug Eluting Stent', brand: 'Meril Life Sciences' },
  { id: 975, deviceName: 'SIROFLEX DES', deviceType: 'Drug Eluting Stent', brand: 'Nano Therapeutics' },
  { id: 976, deviceName: 'Reivas', deviceType: 'Drug Eluting Stent', brand: 'VEIVA SCIENTIFIC' },
  {
    id: 977,
    deviceName: 'ROTAPRO Rotational Atherectomy System',
    deviceType: 'Atherectomy',
    brand: 'Boston Scientific Corporation'
  },
  { id: 978, deviceName: 'Promus ELITE DES', deviceType: 'Drug Eluting Stent', brand: 'Boston Scientific Corporation' },
  { id: 4313, deviceName: 'Vitesse E Laser Catheter', deviceType: 'Laser', brand: 'Spectranetics' },
  { id: 4321, deviceName: 'PK Papyrus', deviceType: 'Covered Stent', brand: 'Biotronik' }
];