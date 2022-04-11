# Vefforritun 2, 2022, verkefni 6

Tengjast skal Prismic repo og sækja þaðan upplýsingar um forsíðu og a.m.k. tvær aðrar síður.

Eftirfarandi eru markmið verkefnisins:

- Notkun á next.js með TypeScript
- Tenging við Prismci „headless CMS“ til að sækja gögn
- Birting á gögnum með mismunandi gildum

## Prismic

Setja skal upp „content types“ fyrir forsíðu og almenna síðu með Prismic.

Hægt er að nota [Slice machine](https://prismic.io/docs/technologies/nextjs) eða „legacy builder“.

Útbúa skal forsíðu og a.m.k. tvær síður sem nota allar „slice“ sem eru skilgreindar.

### GraphQL

Flest skjölun hjá Prismic miðar við að nota REST vefþjónustur. Ekki skal nota þær, heldur [GraphQL vefþjónustur](https://prismic.io/docs/technologies/react-with-graphql). [Sjá dæmi í fyrirlestri 13](https://github.com/vefforritun/vef2-2022/blob/main/vikur/vika-13.md#fyrirlestrar) sem setur upp tengingar gegnum þær.

### Forsíða

Forsíða er með:

- Titil, strengur
- Efni, „richtext“ efni
- Lista af tenglum yfir á aðrar síður
  - Tengill vísar í síðu og eru upplýsingar sóttar gegnum GraphQL

Aðeins er hægt að útbúa eina forsíðu.

### Síða

Síða er með:

- `uid`, einkvæmt gildi (slug) fyrir síðuna
- Titil, strengur
- Lista af „sliceum“ sem útbúa efni, a.m.k.
  - Texti, „richtext“ efni
  - Mynd, vísun í staka mynd með caption texta
  - „Accordion“, titill og síðan endurtekið efnið af fyrirsögn og efni sem er birt ef fyrirsögnin er valinn
  - Önnur gerð sem þið útfærið

Allar síður hafa tengil aftur á forsíðu.

Hægt er að búa til margar síður.

## TypeScript

Nota skal TypeScript til að skilgreina týpur á öllum föllum og breytum.

Öll gögn úr Prismic skulu vera með týpum og þarf því að útbúa `type` eða `interface` fyrir gögn sem koma úr GraphQL.

Ekki skal nota `any` nema eftir að hafa skoðað aðra möguleika. Í sýnilausn er það aðeins notað fyrir `RichText` field með

```ts
export type PrismicRichtext = any;
```

## Viðmót

Setja skal upp einfalt viðmót.

Leyfilegt er að nota CSS eða Sass.

Hægt er að sjá [sýnilausn keyrandi](https://vef2-2022-v6-synilausn-ea7zi4uq9-vefforritun.vercel.app/).

## Hýsing

Setja skal upp vefinn á Vercel, Netlify eða Heroku tengt við GitHub, tengjast skal GraphQL þjónustu Prismic og birta gögn sem eru til og þau sem verða til eftir að vefur er „buildaður“. Nota „data fetching“ gegnum [`getServerSideProps`](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props); eða með [`getStaticPaths`](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths) og [`getStaticProps`](https://nextjs.org/docs/api-reference/data-fetching/get-static-props).

## Mat

- 20% Forsíða sett upp ásamt almennri tengingu við Prismic
- 20% Síður birtar og tengdar við forsíðu
- 20% „Slices“ notaðar á síðu til að að birta a.m.k. fjórar mismunandi gerðir af gögnum
- 20% TypeScript notað til að tilgreina týpur á gögnum
- 20% Tæki og tól; verkefni sett upp í hýsingu

## Sett fyrir

Verkefni sett fyrir í fyrirlestri miðvikudaginn 6. apríl 2022.

## Skil

Skila skal í Canvas í seinasta lagi fyrir lok dags föstudaginn 22. apríl 2022.

Skil skulu innihalda:

- Slóð á verkefni keyrandi á Vercel, Netlify eða Heroku
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `MarzukIngi`
  - `WhackingCheese`

---

> Útgáfa 0.1

| Útgáfa | Breyting      |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |
