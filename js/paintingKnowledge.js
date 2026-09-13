/**
 * SKYVORA — AI Painter knowledge base
 * -----------------------------------------------------------------
 * Structured, expandable knowledge used by js/chatbot.js.
 * Each entry: { id, category, keywords[], answer }
 * Keep this file separate from UI logic so it can be swapped for
 * a real LLM API later without touching the chat interface.
 * -----------------------------------------------------------------
 */

const PAINTING_KNOWLEDGE = [

  /* 01. PAINTING BASICS ------------------------------------------------ */
  {
    id: "basics-01", category: "Painting Basics",
    keywords: ["what is skyvora", "who are you", "about skyvora", "your company", "services you offer", "what do you do"],
    answer: "I'm Skyvora AI, the virtual assistant for SKYVORA Painting & Finishes — owned and run by SATHYA. We handle all types of paint work: wall painting, melamine polish, texture finishes and PU polish. I'm here to help you plan your project, and for a site visit or quote you can reach SATHYA at +91 63831 28470 or +91 99654 88325. What would you like to know?"
  },
  {
    id: "basics-02", category: "Painting Basics",
    keywords: ["painting process", "how does painting work", "steps in painting", "workflow"],
    answer: "A proper paint job generally follows this sequence: surface cleaning, repair of cracks or dents, sanding, putty application where needed, one primer coat, then two finish coats. Each stage needs to dry fully before the next begins — rushing it is the most common cause of a poor finish."
  },

  /* 02. WALL PREPARATION ------------------------------------------------ */
  {
    id: "prep-01", category: "Wall Preparation",
    keywords: ["prepare wall", "surface preparation", "before painting", "prepare room", "clean wall"],
    answer: "Before painting, the surface should be cleaned of dust, grease and any loose or flaking paint. Fill cracks and holes with putty, sand it smooth once dry, and wipe the wall down again. Move or cover furniture, and mask skirting, switches and frames. Good preparation is what makes the final coat look sharp."
  },
  {
    id: "prep-02", category: "Wall Preparation",
    keywords: ["sanding", "sand the wall", "smooth surface"],
    answer: "Sanding removes loose material and old paint texture so the new coat bonds evenly. We typically sand after putty work and lightly again between coats on wood or metal surfaces for a smoother finish."
  },

  /* 03. PUTTY ------------------------------------------------------------ */
  {
    id: "putty-01", category: "Putty",
    keywords: ["putty", "crack filling", "wall cracks", "filling holes", "putty application"],
    answer: "Putty is used to fill cracks, dents and uneven patches before priming. For fine hairline cracks, a single coat is often enough; deeper cracks may need two coats with sanding in between. Once the putty is fully dry and sanded smooth, we move on to priming."
  },

  /* 04. PRIMER ------------------------------------------------------------ */
  {
    id: "primer-01", category: "Primer",
    keywords: ["primer", "primer coat", "why primer", "do i need primer"],
    answer: "Primer seals the surface, improves paint adhesion, and gives you more even colour coverage — especially important when changing from a dark shade to a lighter one, or painting a repaired patch. One primer coat is usually sufficient before the finish coats."
  },

  /* 05. INTERIOR PAINTING -------------------------------------------------- */
  {
    id: "interior-01", category: "Interior Painting",
    keywords: ["bedroom paint", "interior painting", "living room paint", "paint for bedroom", "best paint for home"],
    answer: "For a bedroom, I would generally recommend a good-quality interior emulsion with a low-sheen or matte finish — it looks smooth and is easy to maintain. If you tell me whether the room has any moisture issues and your preferred colour or finish, I can suggest something more specific."
  },
  {
    id: "interior-02", category: "Interior Painting",
    keywords: ["kitchen paint", "bathroom paint", "moisture prone room"],
    answer: "Kitchens and bathrooms benefit from a paint with better moisture and stain resistance — a satin or semi-gloss emulsion wipes clean more easily than a flat matte finish in these areas."
  },

  /* 06. EXTERIOR PAINTING --------------------------------------------------- */
  {
    id: "exterior-01", category: "Exterior Painting",
    keywords: ["exterior painting", "outside wall paint", "outdoor paint", "exterior colours", "weather resistant paint"],
    answer: "Exterior walls need paint formulated to handle sun, rain and temperature changes — typically an exterior acrylic emulsion with good weatherproofing. We also check for dampness and old flaking paint first, since exterior surfaces take more wear than interior ones."
  },

  /* 07. PAINT TYPES ---------------------------------------------------------- */
  {
    id: "types-01", category: "Paint Types",
    keywords: ["emulsion paint", "acrylic paint", "enamel paint", "distemper", "texture paint", "types of paint", "which paint should i use"],
    answer: "Here's a quick guide: emulsion is the standard water-based paint for interior/exterior walls; acrylic emulsion adds better durability and washability; enamel is oil-based, used on metal and wood for a hard glossy finish; distemper is an economical option with a flatter look and shorter lifespan; texture paint creates raised decorative patterns. Tell me the surface and I can narrow it down."
  },
  {
    id: "types-02", category: "Paint Types",
    keywords: ["matte finish", "satin finish", "gloss finish", "sheen level", "finish types"],
    answer: "Matte gives a flat, elegant look and hides wall imperfections well but marks more easily. Satin has a gentle sheen and wipes clean more easily — good for high-traffic areas. Gloss is the most durable and easiest to clean, often used on doors, frames and trims."
  },

  /* 08. TEXTURE FINISHES -------------------------------------------------- */
  {
    id: "texture-01", category: "Texture Finishes",
    keywords: ["texture painting", "wall texture", "texture finish", "how is texture done", "decorative wall finish"],
    answer: "Texture painting uses specialised textured compounds and tools — trowels, rollers or stencils — applied over a prepared wall to create raised patterns, then finished with a top coat of paint. It adds depth and character to a feature wall or an entire room, and every texture is applied by hand, so no two walls look identical."
  },

  /* 09. MELAMINE POLISH ----------------------------------------------------- */
  {
    id: "melamine-01", category: "Melamine Polish",
    keywords: ["melamine polish", "melamine finish", "wood polish", "furniture polish"],
    answer: "Melamine polish is a clear or tinted finish applied to wooden surfaces — doors, furniture, panelling — for a smooth, refined shine that also protects the wood. It's applied in multiple thin coats with light sanding between each for a glass-like result."
  },

  /* 10. PU POLISH ------------------------------------------------------------ */
  {
    id: "pu-01", category: "PU Polish",
    keywords: ["pu polish", "polyurethane polish", "pu finish", "spray painting", "spray gun"],
    answer: "PU (polyurethane) polish is a premium, highly durable finish usually sprayed on for a smooth, even coat. It resists scratches, moisture and yellowing far better than standard varnish, which is why it's popular for high-end wood and furniture finishing. It's typically applied with a spray gun in multiple thin, even passes."
  },

  /* 11. WOOD FINISHING --------------------------------------------------------- */
  {
    id: "wood-01", category: "Wood Finishing",
    keywords: ["wood finishing", "door polish", "wooden furniture finish"],
    answer: "Wood finishing starts with sanding the surface smooth, then applying a sealer or primer suited to wood, followed by your chosen finish — melamine for a classic polished look, or PU for maximum durability and shine."
  },

  /* 12. SPRAY PAINTING ------------------------------------------------------ */
  {
    id: "spray-01", category: "Spray Painting",
    keywords: ["spray painting technique", "spray gun technique", "when to use spray"],
    answer: "Spray application gives the smoothest, most even finish and is ideal for doors, furniture and PU polish work. It requires a controlled environment to avoid overspray, so it's best done by an experienced team — which is exactly the kind of work we handle."
  },

  /* 13. TOOLS & EQUIPMENT ------------------------------------------------- */
  {
    id: "tools-01", category: "Tools & Equipment",
    keywords: ["brushes", "rollers", "spray guns", "what tools do you use", "equipment"],
    answer: "We use good-quality brushes for cutting-in edges and detail work, rollers for large flat wall areas, and spray guns for smooth finishes on wood, metal and PU polish work. The right tool depends on the surface and the finish you want."
  },

  /* 14. NUMBER OF COATS ----------------------------------------------------- */
  {
    id: "coats-01", category: "Number of Coats",
    keywords: ["how many coats", "number of coats", "coats needed", "one coat or two"],
    answer: "Usually, a properly prepared wall needs one primer coat followed by two finish coats. The exact number depends on the existing colour, the surface condition and the paint being used — a big colour change or an uneven old surface may need an extra coat."
  },

  /* 15. DRYING & CURING ------------------------------------------------------- */
  {
    id: "drying-01", category: "Drying & Curing",
    keywords: ["drying time", "recoating time", "how long to dry", "when can i touch the wall"],
    answer: "Most emulsion paints are dry to the touch in about 2 to 4 hours and ready for a recoat after roughly 4 to 6 hours, but full curing can take a few days. PU and melamine finishes usually need longer between coats for the best hardness. Humidity and ventilation affect this too."
  },

  /* 16. COLOUR SELECTION --------------------------------------------------- */
  {
    id: "colour-01", category: "Colour Selection",
    keywords: ["colour selection", "colour combination", "which colour", "interior colour combinations", "choose colour"],
    answer: "For interiors, lighter neutral tones make small rooms feel larger and pair well with most furniture, while an accent wall in a deeper shade adds character without overwhelming the space. If you share the room type and the mood you're going for, I can suggest a combination."
  },

  /* 17. COMMON WALL PROBLEMS ------------------------------------------------- */
  {
    id: "problems-01", category: "Common Wall Problems",
    keywords: ["paint peeling", "peeling", "walls peeling", "paint is peeling", "blistering", "bubbling", "fading", "uneven finish", "colour mismatch", "paint problems", "what went wrong", "paint coming off"],
    answer: "Peeling and blistering are usually caused by moisture trapped under the paint or poor surface preparation. Fading often comes from prolonged sun exposure or lower-quality paint. Uneven finish is typically a coating or application issue — insufficient coats, wrong roller, or painting over a damp surface. Fixing the root cause before repainting is key."
  },

  /* 18. MOISTURE & DAMPNESS ------------------------------------------------ */
  {
    id: "damp-01", category: "Moisture & Dampness",
    keywords: ["damp walls", "waterproofing", "moisture problem", "water seepage", "dampness"],
    answer: "Damp walls need to be treated at the source before any painting — this may mean waterproofing treatment, fixing leaks, or improving ventilation. Painting over a damp wall without addressing the cause usually leads to peeling within months, so we always recommend resolving dampness first."
  },

  /* 19. CRACKS & REPAIRS ------------------------------------------------------ */
  {
    id: "cracks-01", category: "Cracks & Repairs",
    keywords: ["fix wall cracks", "repair cracks", "crack repair"],
    answer: "Small hairline cracks are filled with putty, sanded smooth, and primed before painting. Larger structural cracks should be inspected first, since they may need a different repair approach before any cosmetic finishing."
  },

  /* 20. MAINTENANCE ----------------------------------------------------------- */
  {
    id: "maintenance-01", category: "Maintenance",
    keywords: ["maintenance", "cleaning painted walls", "how to clean walls", "upkeep"],
    answer: "For day-to-day maintenance, a soft, slightly damp cloth works well on emulsion walls — avoid harsh scrubbing. Satin and gloss finishes handle cleaning better than matte. For PU or melamine surfaces, a dry or barely damp cloth keeps the shine without damaging the coating."
  },

  /* 22. COST FACTORS ------------------------------------------------------------ */
  {
    id: "cost-01", category: "Cost Factors",
    keywords: ["cost", "price", "how much", "quote", "estimate", "budget", "charges", "rate"],
    answer: "I can't give an exact price without a few details, since cost depends on square footage, surface condition, paint quality/brand, number of coats, primer/putty requirements, labour and location. If you'd like an estimate, could you share: the approximate area, whether it's interior or exterior, the current wall condition, and the type of finish you want? Our team can also visit for an accurate on-site quote — feel free to call SATHYA at +91 63831 28470 or +91 99654 88325."
  },

  /* 23. CUSTOMER FAQs ----------------------------------------------------------- */
  {
    id: "faq-01", category: "Customer FAQs",
    keywords: ["how much paint do i need", "paint quantity", "coverage", "litres needed"],
    answer: "Paint coverage varies by brand and surface, but a rough guide is that 1 litre of emulsion typically covers around 120–140 sq. ft. per coat on a smooth wall. For an accurate quantity, I'd need the total wall area and number of coats — our team can also calculate this precisely during a site visit."
  },
  {
    id: "faq-02", category: "Customer FAQs",
    keywords: ["how long does painting take", "duration", "how many days"],
    answer: "Timeline depends on the area and finish — a standard room with two coats might take 1 to 2 days including drying time, while texture, melamine or PU polish work takes longer due to multiple thin coats and curing time between them."
  },
  {
    id: "faq-03", category: "Customer FAQs",
    keywords: ["contact", "phone number", "mobile number", "contact number", "contact details", "call", "whatsapp", "reach you", "location", "address", "owner", "who owns skyvora", "who is sathya", "who runs skyvora", "founder", "proprietor", "owner name"],
    answer: "SKYVORA Painting & Finishes is owned and run by SATHYA. For any query, quote or site visit, you can reach SATHYA directly at +91 63831 28470 or +91 99654 88325 — by call or WhatsApp. I'm happy to note down your requirement here too, so you're ready when you call."
  },

  /* 24. PROFESSIONAL RECOMMENDATIONS -------------------------------------------- */
  {
    id: "reco-01", category: "Professional Recommendations",
    keywords: ["what do you recommend", "suggestion", "advice", "best option"],
    answer: "My honest recommendation always depends on the surface, the finish you want, and your budget. Tell me a bit more about the space — room type, surface, and current condition — and I'll suggest the option that fits best."
  },
];

/* Greeting & fallback content, kept separate from the Q&A entries */
const CHAT_GREETING = "Welcome to SKYVORA Painting & Finishes! I'm Skyvora AI. Ask me anything about wall painting, texture, melamine polish, PU polish, surface preparation, pricing or general painting guidance — I'm here to help.";

const CHAT_FALLBACK = "I'm not sure about that one, sir, but I can help with anything painting and finishing related — wall painting, texture, PU polish, melamine polish, surface preparation, pricing or general guidance. You can also reach SATHYA directly at +91 63831 28470 or +91 99654 88325 for anything else.";

const SUGGESTED_QUESTIONS = [
  "What paint is best for bedrooms?",
  "How many coats are required?",
  "How do I fix wall cracks?",
  "What is PU polish?",
  "What is melamine polish?",
  "How is texture painting done?",
  "How much paint do I need?",
  "What should I do before painting?"
];
