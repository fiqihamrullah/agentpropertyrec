
export function avatarUrl(name, { bg = "C89B5C", color = "12161F" } = {}) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=${bg}&color=${color}&bold=true&size=128`;
}