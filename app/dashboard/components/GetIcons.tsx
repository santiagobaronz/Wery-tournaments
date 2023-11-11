import React from 'react';
import {
	BsFillLightningChargeFill,
	BsFillRocketTakeoffFill,
	BsApple,
	BsBrightnessHighFill,
	BsCloudFill,
	BsCupHot,
	BsDice5Fill,
	BsHearts,
	BsMoonStarsFill,
	BsStarFill,
	BsSuitClubFill,
	BsYinYang
} from 'react-icons/bs';

interface PropsGetIcons {
	icon: string;
	color: string;
}

export default function GetIcons(props: PropsGetIcons) {
	const iconName = props.icon;
	const iconColor = props.color;

	const getColor = () => {
		switch (iconColor) {
			case 'purple':
				return '#8B5FBF';
			case 'blue':
				return '#0085ff';
			case 'green':
				return '#24613b';
			case 'red':
				return '#c2402a';
			case 'pink':
				return '#FF6B6B';
			case 'yellow':
				return '#dca10f';
			default:
				return '#2d2d2d';
		}
	}

	const getIcon = () => {
		switch (iconName) {
			case 'BsFillLightningChargeFill':
				return <BsFillLightningChargeFill fill={'#FFF'} />;
			case 'BsFillRocketTakeoffFill':
				return <BsFillRocketTakeoffFill fill={'#FFF'} />;
			case 'BsApple':
				return <BsApple fill={'#FFF'} />;
			case 'BsBrightnessHighFill':
				return <BsBrightnessHighFill fill={'#FFF'} />;
			case 'BsCloudFill':
				return <BsCloudFill fill={'#FFF'} />;
			case 'BsCupHot':
				return <BsCupHot fill={'#FFF'} />;
			case 'BsDice5Fill':
				return <BsDice5Fill fill={'#FFF'} />;
			case 'BsHearts':
				return <BsHearts fill={'#FFF'} />;
			case 'BsMoonStarsFill':
				return <BsMoonStarsFill fill={'#FFF'} />;
			case 'BsStarFill':
				return <BsStarFill fill={'#FFF'} />;
			case 'BsSuitClubFill':
				return <BsSuitClubFill fill={'#FFF'} />;
			case 'BsYinYang':
				return <BsYinYang fill={'#FFF'} />;
			default:
				return null;
		}
	}

	return (
		<div style={{backgroundColor: getColor()}} className='w-1/6 flex justify-center p-4 rounded-lg'>
			{getIcon()}
		</div>
	)

}