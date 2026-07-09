<!-- [CLIENT DETAILS] -->
/* ============================================================================
   EVERWOOD CONSTRUCTION — CLIENT DETAILS (single source of truth)
   ----------------------------------------------------------------------------
   This file is the ONE place business content lives. It is an AUTHORING
   REFERENCE ONLY: it is NOT linked from any page and does NOT run in the
   browser. Edit the values below, then regenerate the static HTML pages so
   their markup matches. Nothing that changes per client lives outside this
   file — including the photo URLs.

   To reskin for a new client: change every value here, then update the
   matching static HTML (see README.md "Reskin checklist"). Keep js/main.js
   PROMISE_TEXT identical to the `promise` field below.
   ============================================================================ */

const companyName  = "Everwood Construction";
const tagline       = "Built once. Built right.";
const foundedYear   = "2004";
const ownerName     = "Dan Kowalski";

// Each item below appears verbatim in the trust bar and footer.
const credentials   = ["CCB #198442", "Bonded & Insured", "Est. 2004", "5-Year Workmanship Warranty"];

const phone         = "(555) 214-8890";
const email         = "hello@everwoodconstruction.com";
const address       = "1420 Granite Way, Portland, OR";
const website       = "https://www.everwoodconstruction.com";
const hours         = "Mon–Fri 7am–5pm, Sat by appointment";

// SOURCE OF TRUTH for js/main.js PROMISE_TEXT. Keep both identical.
const promise       = "Free on-site estimate, no obligation, written quote within 3 business days";

// Service categories. The <select> options in contact.html must match this list.
const services = [
  "Kitchen remodels",
  "Bathroom renovations",
  "Room additions",
  "Full-home renovations",
  "Decks & outdoor structures",
  "Structural repair"
];

// Faint background photo shown behind each service card (and reused behind the
// matching testimonial cards). Images are business data — swap per client.
const serviceImages = {
  "Kitchen remodels":          "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=70&auto=format&fit=crop",
  "Bathroom renovations":      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=70&auto=format&fit=crop",
  "Room additions":            "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=70&auto=format&fit=crop",
  "Full-home renovations":     "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=70&auto=format&fit=crop",
  "Decks & outdoor structures":"https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=600&q=70&auto=format&fit=crop",
  "Structural repair":         "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=600&q=70&auto=format&fit=crop"
};

// projects: array of { neighborhood, projectType, budgetRange, durationWeeks, challenge, image }
const projects = [
  {
    neighborhood: "Laurelhurst",
    projectType: "Kitchen remodel",
    budgetRange: "$52–68k",
    durationWeeks: "7 weeks",
    challenge: "The 1912 house had no way to open the kitchen to the dining room without a post in the middle of the walkway. We set a flush LVL beam up inside the ceiling so the span carried clean, then re-ran the gas line for the new range wall.",
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&q=70&auto=format&fit=crop"
  },
  {
    neighborhood: "Irvington",
    projectType: "Bathroom renovation",
    budgetRange: "$28–36k",
    durationWeeks: "5 weeks",
    challenge: "Once we pulled the old tile we found rot in the subfloor and a corroded cast-iron waste line. We stopped, took photos, and walked the owners through a fixed add of $2,400 before touching anything else.",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=70&auto=format&fit=crop"
  },
  {
    neighborhood: "Beaumont",
    projectType: "Room addition",
    budgetRange: "$110–140k",
    durationWeeks: "16 weeks",
    challenge: "A 320 sq ft primary suite over a new slab. The tricky part was tying the new roofline into the existing gable so it read as original, and stepping the footing for a lot that dropped 3 feet front to back.",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=70&auto=format&fit=crop"
  },
  {
    neighborhood: "Sellwood",
    projectType: "Full-home renovation",
    budgetRange: "$210–260k",
    durationWeeks: "22 weeks",
    challenge: "A full gut of a 1920s bungalow. We pulled all the knob-and-tube wiring, re-leveled a floor that had dropped 1.5 inches over the years, and kept the original fir trim by numbering and storing every piece before demo.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=70&auto=format&fit=crop"
  },
  {
    neighborhood: "Mt. Tabor",
    projectType: "Deck & covered structure",
    budgetRange: "$24–32k",
    durationWeeks: "4 weeks",
    challenge: "A covered cedar deck on a lot that sloped hard toward the house. We poured six deep footings below frost line, sloped the framing a quarter inch to shed water, and ran a French drain so the grade behind it stays dry.",
    image: "https://images.unsplash.com/photo-1595877244574-e90ce41ce089?w=800&q=70&auto=format&fit=crop"
  },
  {
    neighborhood: "St. Johns",
    projectType: "Structural repair",
    budgetRange: "$34–48k",
    durationWeeks: "6 weeks",
    challenge: "The back corner of the house was sinking. We shored the floor, replaced two failing support posts and a rotted girder, sistered eleven joists, and set new concrete piers to bring the floor back within a quarter inch of level.",
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=70&auto=format&fit=crop"
  }
];

// testimonials: array of { name, neighborhood, projectType, quote }
const testimonials = [
  {
    name: "Maria O.",
    neighborhood: "Laurelhurst",
    projectType: "Kitchen remodel",
    quote: "Dan's crew opened our kitchen to the dining room the way we'd wanted for years. The slab under the old floor wasn't level and it set us back about a week, but they explained it plainly and the finished floor is dead flat. No surprises on the final bill."
  },
  {
    name: "Greg P.",
    neighborhood: "Irvington",
    projectType: "Bathroom renovation",
    quote: "They found rot under the old tile that nobody could have seen up front. Instead of burying it they showed me photos and gave me a written number before doing the work. That's the part I'd tell other people about."
  },
  {
    name: "Thanh N.",
    neighborhood: "Beaumont",
    projectType: "Room addition",
    quote: "Our addition had to match a 1940s roofline and it does — most people can't tell it wasn't always there. Weekly updates every Friday meant I always knew what was happening. It ran about ten days long, which they flagged early when the framing inspection got rescheduled."
  },
  {
    name: "Carol & Dave R.",
    neighborhood: "Sellwood",
    projectType: "Full-home renovation",
    quote: "Living through a full renovation is hard no matter who does it. Everwood kept the site clean and the schedule honest. They saved our original fir trim like we asked, which two other bidders told us wasn't worth the effort."
  },
  {
    name: "Ben M.",
    neighborhood: "St. Johns",
    projectType: "Structural repair",
    quote: "The back of our house was visibly dropping. Dan walked the crawlspace with me before quoting so I understood exactly what was failing. The floor is level again and the fix came in on the low end of the range he gave us."
  }
];

// heroImage: wide background photo for the home hero (finished residential build at dusk)
const heroImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=70&auto=format&fit=crop";

// ownerPhoto: portrait standing in for Dan Kowalski on the About page
const ownerPhoto = "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=600&q=70&auto=format&fit=crop";
