// Imports
import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

// Specific structure for ImageCarousel
/* 
    images:
        - file: 'URL/file name'
        - artist: '[artist-link-text](artist-link-URL)'
*/
const imageSchema = z.union([
    z.string(), // "portrait.png"
    z.object({  // { file: "portrait.png", artist: "@artist" }
        file: z.string(),
        artist: z.string().optional().nullable(),
    }),
]);

// --- CLANS COLLECTION ---
const clans = defineCollection({
    // Find all '_index.md' files
    loader: glob({ pattern: "**/_index.md", base: "./src/content/characters" }),

    // The schema
    schema: z.object({
        // MUST HAVE
        name: z.string(),

        // OPTIONALS
        nickname: z.string().optional().nullable(),
        disciplines: z.string().optional().nullable(),
        disciplinesv5: z.string().optional().nullable(),
        bane: z.string().optional().nullable(),
        compulsion: z.string().optional().nullable(),

        // Clan images
        images: z.array(imageSchema).optional().nullable(),
    
    // Allow any other field (anything goes: sect, bloodlines, whatever)
    }).catchall(z.any()),
});

// --- CHARACTER SCHEMA ---
const characters = defineCollection({
    // Find the files...
    // Ignore '_index.md' files
    loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/characters" }),
    
    // The schema
    schema: z.object({
        // MUST HAVE
        name: z.string(),
        clan: z.string(),

        // Optional fields
        generation: z.string().optional().nullable(),
        sire: z.string().optional().nullable(),

        // Character portrait images
        images: z.array(imageSchema).optional().nullable(),
        
        // Character Sheet: allow any structure (to allow variance between V5/V20/etc)
        sheet: z.record(z.any()).optional().nullable(),

    // Allow any other field (anything goes: sect, ambition, whatever)
    }).catchall(z.any()),
});

export const collections = { clans, characters };