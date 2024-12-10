import particlesConfig from "./config/particlesConfig";
import Particles from "react-particles";
import { useCallback } from "react";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {

    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles
            options={particlesConfig}
            init={particlesInit}
            loaded={particlesLoaded} />
    );
};

export default ParticlesBackground;