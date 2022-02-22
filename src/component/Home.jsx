import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../icons';
import '../style/home.scss';
import Carousel from './Carousel';
const roomCHT = [
	'單人房',
	'豪華單人房',
	'雙人房',
	'豪華雙人房',
	'雙床房',
	'豪華雙床房'
];
const Home = ({ rooms }) => {
	return (
		<div className="Home">
			<div className="slider">
				<Carousel pics={roomsBackgroundImg} />
				<div className="about">
					<div className="logo">
						<img src={imageUrl.logo_white} className="icon logo" alt="logo" />
					</div>
					<div className="info">
						<div className="info-socail">
							<img src={imageUrl.instagram} className="icon" alt="InsIcon" />
							<img src={imageUrl.facebook} className="icon" alt="FBIcon" />
						</div>
						<div className="info-content">
							<div className="info-content-line">
								<img src={imageUrl.tel} className="icon" alt="telIcon" />
								<span>02-17264937</span>
							</div>
							<div className="info-content-line">
								<img src={imageUrl.mail} className="icon" alt="mailIcon" />
								<span>whitespace@whitespace.com.tw</span>
							</div>
							<div className="info-content-line">
								<img src={imageUrl.house} className="icon" alt="houseIcon" />
								<span>台北市羅斯福路十段30號</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="rooms">
				{rooms.map((room, index) => (
					<div key={index} className="rooms-box" style={{ backgroundImage: `url(${room.imageUrl})` }}>
						<Link to={`/room/${room.id}`}>
							<div className="rooms_box-info">
								<div className="rooms_box_info-name">{room.name}</div>
								<div className="rooms_box_info-detail hover">
									<div>{roomCHT[index]}</div>
									<div>
										<span className="large">{`NT.${room.normalDayPrice}`}</span>
										平日
										<span className="right">{`NT.${room.holidayPrice} 假日`} </span>
									</div>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;

const roomsBackgroundImg = [
	'https://images.unsplash.com/photo-1515511856280-7b23f68d2996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1953&q=80',
	'https://images.unsplash.com/photo-1558211583-03ed8a0b3d5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
	'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
	'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
	'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
	'https://images.unsplash.com/photo-1534986622832-777a66b043bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80'
];
