export function buttonClass(fields?: string) {
  if (fields?.includes("wide")) {
    return `${defaultClass} md:!w-1/2`
  }
  return `${defaultClass} ${fields}`
}

const defaultClass =
  "glass-button md:px-6 w-full disabled:text-gray-300 disabled:shadow-none disabled:cursor-not-allowed md:w-auto"
