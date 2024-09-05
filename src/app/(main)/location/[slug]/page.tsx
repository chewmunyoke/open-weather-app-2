import Header from '@/components/header';
import Main from '@/components/main';

import WeatherCard from './card-weather';

export default function LocationPage({
  params,
}: Readonly<{ params: Record<string, string> }>) {
  const location = params.slug;

  return (
    <>
      <Header location={location} />
      <Main>
        <WeatherCard currentLocation={location} />
      </Main>
    </>
  );
}
