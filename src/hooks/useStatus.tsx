import { useState } from "react"

export default function useStatus({
    apps,
    done
}: {
    apps: number[],
    done: () => any
}) {

    const [currentApp, setCurrentApp] = useState<number>(0);

    const getStatus = () => {
        const temp = apps.sort((a, b) => a - b);
        setCurrentApp(temp[0]);
    }

    const nextStep = () => {
        const c = apps.indexOf(currentApp);
        const newIndex = c + 1;
        console.log(newIndex, apps.length, c, "this is pa");
        if (newIndex >= apps.length) {
            done();
        }
        else {
            console.log(newIndex, apps[newIndex], "this is p");
            setCurrentApp(apps[newIndex])
        }
    }

    const reset = () => {
        setCurrentApp(0);
    }

    return {
        getStatus,
        currentApp,
        nextStep,
        reset
    }
}
