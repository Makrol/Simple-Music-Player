import React from "react";
import useSound from "use-sound";

function MusicComponent({ music }) {
  const musicData = useSound(music);

  const getPlay = () => {
    return musicData.play;
  };

  const getPause = () => {
    return musicData.pause;
  };

  const getDuration = () => {
    return musicData.duration;
  };

  const getSound = () => {
    return musicData.sound;
  };

  return null; // lub inny dowolny zwracany element JSX, jeśli potrzebujesz renderowania czegoś w tym komponencie
}

export default class MusicObject {
  musicData;

  constructor(music) {
    this.musicData = <MusicComponent music={music} />;
  }

  getPlay() {
    return this.musicData.props.getPlay();
  }

  getPause() {
    return this.musicData.props.getPause();
  }

  getDuration() {
    return this.musicData.props.getDuration();
  }

  getSound() {
    return this.musicData.props.getSound();
  }
}