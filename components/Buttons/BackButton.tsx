import { motion } from "framer-motion";
import { MoveRight as BaseMoveRight, X as BaseX } from "lucide-react";
import { ComponentProps, FC } from "react";
import { BaseRolloutButton } from "./BaseRolloutButton";

const X = motion(BaseX);
const MoveRight = motion(BaseMoveRight);

export const BackButton: FC<
  Omit<
    ComponentProps<typeof BaseRolloutButton>,
    "ComponentA" | "ComponentB" | "text"
  >
> = (props) => {
  return (
    <BaseRolloutButton
      ComponentA={(props) => <X {...props} />}
      ComponentB={(props) => <MoveRight {...props} />}
      text={"Back"}
      {...props}
    />
  );
};
