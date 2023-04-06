import type { Models } from '@appwrite.io/console';
import type { Attributes } from '../../store';

//TODO: remove `side` after SDK update
export function isRelationshipToMany(attribute: Models.AttributeRelationship & { side: string }) {
    if (!attribute) return false;
    if (!attribute?.relationType) return false;
    if (attribute?.side === 'child') {
        return !['oneToOne', 'oneToMany'].includes(attribute?.relationType);
    } else {
        return !['oneToOne', 'manyToOne'].includes(attribute?.relationType);
    }
}

export function isRelationship(attribute: Attributes): attribute is Models.AttributeRelationship {
    if (!attribute) return false;
    return attribute?.type === 'relationship';
}
