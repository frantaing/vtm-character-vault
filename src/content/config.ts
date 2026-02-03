// Imports
import { defineCollection, z } from "astro:content";

// Define the schema for 'characters'
const characters = defineCollection({
    type: 'content',
    schema: z.object({
        // VALIDATION: these fields MUST EXIST!!
        name: z.string(),
        clan: z.string(),

        // Optional fields
        generation: z.string().optional(),
        sire: z.string().optional(),

        // Images (same structure as in legacy)
        /* 
        #  images:
        #       - file: 'URL/file name'
        *       - artist: '[artist-link-text](artist-link-URL)'
        */
        images: z.array(
            z.union([
                z.string(), // Allow simple string
                z.object({ // Allow object with artist credit (text + URL)
                    file: z.string(),
                    artist: z.string().optional()
                })
            ])
        ).optional(),
        
        // Character Sheet: allow any structure (to allow variance between V5/V20/etc)
        sheet: z.record(z.any()).optional(),

    // Allow any other field (anything goes: sect, ambition, whatever)
    }).catchall(z.any()),
});