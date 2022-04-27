export enum TraitType {
  Prompt,
  Pattern,
}

interface TraitTypeValue {
  [TraitType.Prompt]: string
  [TraitType.Pattern]: string
}

export interface ContributionAttribute<T extends TraitType> {
  trait_type: T
  value: TraitTypeValue[T]
}

export interface ContributionMetadata {
  name: string
  description: string
  animation_url: string
  external_url: string
  background_color: string
  attributes: ContributionAttribute<TraitType>[]
}
