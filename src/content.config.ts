import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categoriaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  desc: z.string(),
  zonas: z.array(z.string()),
  productos: z.array(z.string()),
});

const categorias = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/categorias' }),
  schema: z.object({ categorias: z.array(categoriaSchema) }),
});

export const collections = { categorias };
