export enum System {
  city = 'city',
  otherscape = 'otherscape',
  legend = 'legend',
}

export enum TagType {
  power = "power",
  weakness = "weakness",
  status = "status",
  spectrum = "spectrum",
  limit = "limit",
  story = "story",
}

export enum ThemeType {
  mythos = 'mythos',
  logos = 'logos',
  self = 'self',
  noise = 'noise',
  origin = 'origin',
  adventure = 'adventure',
  greatness = 'greatness',
  story = 'story',
}

export type YamlSource =
  string | Record<string, any> | Array<any> | null | undefined;
