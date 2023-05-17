/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import useStore from '@src/store';
import { Work } from '@src/store/types';
import { HTMLProps, useState } from 'react';
import { Tab } from '@headlessui/react';
import { cx } from '@vechaiui/react';
import { Title } from '@src/components/Commons';
import { handleScroll } from '@src/etc/Helpers';

const convertDate = (date: string) => {
  return new Date(date).toLocaleDateString('default', {
    month: 'long',
    year: 'numeric'
  });
};

export default function Work(props: HTMLProps<HTMLDivElement>) {
  const [activeWork, setActiveWork] = useState<number>(0);

  const { works } = useStore();

  const tabAnimation = (opacity: number) =>
    document.querySelector(`.tabPanel`)?.animate(
      {
        opacity
      },
      { duration: 250, fill: 'forwards' }
    );

  const handleTabChange = (index: number) => {
    const fadeAni = tabAnimation(0);
    if (fadeAni && typeof index === 'number') {
      fadeAni.onfinish = () => {
        setActiveWork(index);
        tabAnimation(1);
      };
    }
  };

  const renderWork = (work: Work) => {
    return (
      <Tab.Panel
        className="mainText flex w-full flex-col gap-8 transition-all "
        key={work.companyName}
      >
        {work.experiences.map((experience, i) => (
          <div className="flex flex-col gap-3 xl:px-4" key={i}>
            <h1 className="subTitle text-muted whitespace-pre-wrap sm:whitespace-nowrap">
              <span>
                {experience.title}
                <span className="text-foreground">
                  {'\n @ '}
                  {work.companyName}
                </span>
              </span>
            </h1>
            <p className="mainText text-muted">
              {convertDate(experience.from)} - {convertDate(experience.to)}
            </p>
            <div className="subText w-full xl:px-4">
              {experience.descriptions.map((desc, j) => (
                <p className="w-full p-1" key={`exp${i}-${j}`}>
                  {' '}
                  · {desc}
                </p>
              ))}
            </div>
          </div>
        ))}
      </Tab.Panel>
    );
  };

  return (
    <Tab.Group
      // @ts-ignore
      as={'div'}
      className="flex h-screen flex-col gap-5 py-16 pb-24 md:h-full md:px-4 md:py-[10vh]"
      selectedIndex={activeWork}
      // @ts-ignore
      onChange={handleTabChange}
      id="work"
      {...props}
    >
      <Title>Work</Title>
      {works && (
        <>
          <Tab.List className={cx('flex subText font-works gap-1')}>
            {works.map((work) => (
              <Tab
                key={work.companyName}
                value={work.companyName}
                className={cx(
                  'xl:px-12 xl:py-4 p-4 hover:border-foreground hover:brightness-100 hover:bg-foreground/15 border-2 transition-all border-transparent brightness-75',
                  'selected:border-foreground selected:bg-foreground/25 selected:brightness-110'
                )}
              >
                {work.companyName}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels
            className="tabPanel flex-1 overflow-y-auto"
            onWheel={handleScroll}
          >
            {works.map((work) => renderWork(work))}
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  );
}
