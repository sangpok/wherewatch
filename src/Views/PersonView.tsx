/** React */
import React, { useMemo } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

/** Component */
import ContentCard from "@Components/ContentCard";
import JoinedText from "@Components/JoinedText";
import ProfileCoverflow from "@Components/ProfileCoverflow";
import Wherewatch from "@Components/Wherewatch";

/** Style */
import { BackButton } from "./ContentItemView.styled";

/** Icon */
import SyncLoader from "react-spinners/SyncLoader";

/** Hook */
import useNavigateBack from "@Hooks/useNavigateBack";

/** API */
import { getPersonDetail } from "@API/index";
import { useQuery } from "react-query";

/** Type */
import type { TMDBPerson } from "@Types/index";

/** Animation */
import { defaultAnimation } from "@Animation/index";
import { motion } from "framer-motion";

/** Util */
import { getDepartmentName } from "@Lib/genre";

const PersonView = () => {
  const navigate = useNavigate();
  const navigateBack = useNavigateBack();

  const { id } = useParams();

  const {
    isSuccess,
    isLoading,
    data: personDetail,
  } = useQuery<TMDBPerson>(["detail", id], () => getPersonDetail(id));

  const defaultAnimationProp = useMemo(() => defaultAnimation, []);

  if (isLoading) {
    return (
      <motion.div
        {...defaultAnimationProp}
        className="mt-[10vw] flex w-full items-center justify-center"
      >
        <SyncLoader />
      </motion.div>
    );
  }

  if (!personDetail || !isSuccess) {
    return;
  }

  const { images, name, known_for_department, birthday, combined_credits } =
    personDetail;

  const { profiles } = images;
  const { cast } = combined_credits;

  const personDescription = (() => {
    const descriptions = [];

    descriptions.push(getDepartmentName(known_for_department));

    if (!birthday) {
      descriptions.push("-년", "-세");
    } else {
      const year = birthday.substring(0, 4);
      const age = (
        new Date().getUTCFullYear() - parseInt(birthday.substring(0, 4))
      ).toString();

      descriptions.push(year + "년", age + "세");
    }

    return descriptions;
  })();

  return (
    <motion.div {...defaultAnimationProp} className="overflow-hidden">
      <div className=" absolute left-[3.33vw] top-[6.66vw] flex flex-row gap-[1.11vw]">
        <BackButton onClick={() => navigateBack()} fill="black" />

        <NavLink to="/">
          <Wherewatch />
        </NavLink>
      </div>

      <ProfileCoverflow
        viewport={document.documentElement}
        profiles={profiles.map(({ file_path }) => file_path)}
      />

      <div className="mx-auto mt-[4.44vw] flex w-fit flex-col place-content-center place-items-center">
        <p className=" text-center text-[7.77vw] font-bold">{name}</p>

        <JoinedText textList={personDescription} />
      </div>

      <div className=" mx-[3.33vw] my-[13.33vw]">
        {cast.length === 0 && (
          <p className="text-center text-[3.33vw]">
            작품 정보가 존재하지 않아요😢
          </p>
        )}

        <div className="grid grid-cols-2 gap-[4.44vw]">
          {cast.map((result) => {
            const { id, media_type } = result;

            return (
              <ContentCard
                key={id}
                mediaType={media_type}
                contentDetail={result}
                onTap={() => navigate(`/${media_type}/${id}`)}
                cardType="medium"
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const MemoedPersonView = React.memo(PersonView);

export default MemoedPersonView;
