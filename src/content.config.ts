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
    loader: glob({ pattern: "**/_index.md", base: "./src/content/characters" }),
    schema: z.record(z.any()).superRefine((data, ctx) => {
        if (!data.name) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Clan name is required",
                path: ["name"]
            });
        }
    }),
});

// --- CHARACTER SCHEMA ---
const characters = defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/characters" }),
    
    /* 
       Instead of z.object({ ... }).catchall(), use z.record(z.any()).
       This treats the frontmatter as one single, ordered object.
    */
    schema: z.record(z.any()).superRefine((data, ctx) => {
        if (!data.name) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Character name is required",
                path: ["name"]
            });
        }
        if (!data.clan) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Character clan is required",
                path: ["clan"]
            });
        }
        if (data.images && !Array.isArray(data.images)) {
             ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Images must be an array",
                path: ["images"]
            });
        }
    }),
});

export const collections = { clans, characters };