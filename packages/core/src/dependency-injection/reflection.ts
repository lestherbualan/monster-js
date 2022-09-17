export type MetadataKey = string;
export type PropertyKey = string;
export type Target = object | Function;

export const Metadata = new WeakMap();

export const getMetadataMap = <MetadataValue>(
  target: Target,
  propertyKey?: PropertyKey,
): Map<MetadataKey, MetadataValue> | undefined => Metadata.get(target) && Metadata.get(target).get(propertyKey);

function ordinaryGetOwnMetadata<MetadataValue>(
  metadataKey: MetadataKey,
  target: Target,
): MetadataValue | undefined {
  if (target === undefined) throw new TypeError();
  const metadataMap = getMetadataMap<MetadataValue>(target);
  return metadataMap && metadataMap.get(metadataKey);
}

const ordinaryGetMetadata = <MetadataValue>(
  metadataKey: MetadataKey,
  target: Target
): MetadataValue | undefined => ordinaryGetOwnMetadata<MetadataValue>(metadataKey, target)
    ? ordinaryGetOwnMetadata<MetadataValue>(metadataKey, target)
    : Object.getPrototypeOf(target)
    ? ordinaryGetMetadata(
        metadataKey,
        Object.getPrototypeOf(target)
      )
    : undefined;

function createMetadataMap<MetadataValue>(
    target: Target,
    propertyKey?: PropertyKey,
): Map<MetadataKey, MetadataValue> {
    const targetMetadata = Metadata.get(target) || new Map<PropertyKey | undefined, Map<MetadataKey, MetadataValue>>();
    Metadata.set(target, targetMetadata);
    const metadataMap = targetMetadata.get(propertyKey) || new Map<MetadataKey, MetadataValue>();
    targetMetadata.set(propertyKey, metadataMap);
    return metadataMap;
}

function ordinaryDefineOwnMetadata<MetadataValue>(
    metadataKey: MetadataKey,
    metadataValue: MetadataValue,
    target: Target,
    propertyKey?: PropertyKey,
): void {

    if (propertyKey && !['string'].includes(typeof propertyKey)) throw new TypeError();

    (getMetadataMap<MetadataValue>(target, propertyKey)
    || createMetadataMap<MetadataValue>(target, propertyKey)).set(metadataKey, metadataValue);
}

export const getMetadata = <MetadataValue>(
  metadataKey: MetadataKey,
  target: Target,
): MetadataValue | undefined => ordinaryGetMetadata<MetadataValue>(metadataKey, target);

export function metadata<MetadataValue>(
    metadataKey: MetadataKey,
    metadataValue: MetadataValue,
) {
    return function decorator(target: Target, propertyKey?: PropertyKey): void {
        ordinaryDefineOwnMetadata<MetadataValue>(
            metadataKey,
            metadataValue,
            target,
            propertyKey,
        );
    };
}
// const originalMetadata = Reflect.metadata;
// function metadata<MetadataValue>(...args: any[]) {
//   const originalMetadataCaller = () => originalMetadata.apply(this, args);
//   return function decorator(target: Target, propertyKey?: PropertyKey): void {
//     const metadataKey = args[0];
//     const metadataValue = args[1];
//     if ((target as any).isMunster) {
//       ordinaryDefineOwnMetadata<MetadataValue>(
//           metadataKey,
//           metadataValue,
//           target,
//           propertyKey,
//       );
//     } else {
//       originalMetadataCaller().apply(this, arguments);
//     }
//   };
// }

// const originalGetMetadata = Reflect.getMetadata;
// export function getMetadata<MetadataValue>(
//   metadataKey: MetadataKey,
//   target: Target,
// ): MetadataValue | undefined {
//   if ((target as any).isMunster) {
//     return ordinaryGetMetadata<MetadataValue>(metadataKey, target);
//   } else {
//     return originalGetMetadata.apply(this, arguments);
//   }
// }

export const Reflection = {
  getMetadata,
  metadata,
};

declare global {
  namespace Reflect {
    let getMetadata: typeof Reflection.getMetadata;
    let metadata: typeof Reflection.metadata;
  }
}

Object.assign(Reflect, Reflection);
