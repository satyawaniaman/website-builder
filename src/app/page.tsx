"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import * as reactSpring from "@react-spring/three";
import * as drei from "@react-three/drei";
import * as fiber from "@react-three/fiber";

export default function Page() {
  const [value, setValue] = useState("");
  const trpc = useTRPC();

  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("Messages created");
      },
    }),
  );

  return (
    <div className="relative w-full min-h-screen">
      {/* Shader Background - Fixed positioning */}
      {/*<div className="fixed inset-0 -z-10">
        <ShaderGradientCanvas
          style={{
            width: "100%",
            height: "100%",
          }}
          fov={10}
          pixelDensity={4}
          pointerEvents="none"
          importedFiber={{ ...fiber, ...drei, ...reactSpring }}
        >
          <ShaderGradient
            animate="on"
            type="plane"
            wireframe={true}
            shader="positionMix"
            uTime={11.7}
            uSpeed={0.28}
            uStrength={2.5}
            uDensity={2}
            uFrequency={0}
            uAmplitude={0}
            positionX={0.7}
            positionY={0}
            positionZ={0}
            rotationX={60}
            rotationY={0}
            rotationZ={30}
            color1="#094a52"
            color2="#1f1fb3"
            color3="#009cff"
            reflection={0.4}
            cAzimuthAngle={184}
            cPolarAngle={67}
            cDistance={3}
            cameraZoom={8.5}
            lightType="env"
            brightness={1.3}
            envPreset="city"
            grain="on"
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </div>*/}

      {/* Your Content - Now on top of the shader */}
      <div className="relative z-10 p-4 max-w-7xl mx-auto">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          disabled={createMessage.isPending}
          onClick={() => createMessage.mutate({ value })}
        >
          Invoke Background Job
        </Button>
        {JSON.stringify(messages)}
      </div>
    </div>
  );
}
