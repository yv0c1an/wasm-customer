import cache from "@/lib/utils/cache";

export function getHeader(): { Authorization: string } {
  return {
    Authorization: "Bearer " + getToken(),
  };
}

export function getToken(): string | null {
  return cache.local.get(cache.projectName);
}

export function setToken(token: string): void {
  cache.local.set(cache.projectName, token);
}

export function removeToken(): void {
  cache.local.remove(cache.projectName);
}
