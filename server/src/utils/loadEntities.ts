import { join } from 'path';
import { sync as globSync } from 'glob';

// Load all entities from a given path
// Used for dynamically loading all entities in the app.module.ts file
export function loadEntities(pattern: string): Function[] {
  const entities: Function[] = [];
  const files = globSync(pattern);

  files.forEach((file) => {
    const entity = require(join(process.cwd(), file));
    const entityClass = Object.values(entity)[0];
    //@ts-ignore
    entities.push(entityClass);
  });

  return entities;
}
