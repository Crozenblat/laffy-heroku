import React, {Fragment, useState, useEffect} from "react";
import axios from "axios";

import withErrorHandler from "../../hoc/withErrorHandler";

import TourDate from "../../components/Comedian/TourDate";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import InfoMessage from "../../components/Messages/InfoMessage";
import ngeohash from "ngeohash"

const TourFeed = props => {
    const [content, setContent] = useState(<LoadingIcon/>);

    useEffect(() => {
// To stop memory leakage due to double-rendering of the Comedian container on info change.
        const source = axios.CancelToken.source();

        navigator.geolocation.getCurrentPosition(async (position) => {
            let userGeohash = ngeohash.encode(position.coords.latitude, position.coords.longitude);

            if(props.type === "comedian"){
                try{
                    let name = props.name.split(" ").join("-");
                    let url = `https://app.ticketmaster.com/discovery/v2/events.json?size=8&apikey=0pcDw6l1FVRrpWQ6nxhc8KNfFNRjYom3&classificationName=comedy&keyword=${name}&sort=distance,asc&geoPoint=${userGeohash}`;
                    let getShows = await axios.get(`/shows?apiUrl=${encodeURIComponent(url)}`, {cancelToken: source.token});
                    let hasEvents = getShows.data._embedded;
                    if(hasEvents){
                        let formattedShows = hasEvents.events.map(show => {
                            console.log(show);
                            return{
                                name: props.name,
                                accountImage: props.accountImage,
                                venue: show._embedded.venues[0].name || undefined,
                                city: show._embedded.venues[0].city.name,
                                stateCode: show._embedded.venues[0].state ? show._embedded.venues[0].state.stateCode : show._embedded.venues[0].country.countryCode,
                                time: show.dates.start.dateTime,
                                url: show.url
                            }
                        });

                        setContent(formattedShows.slice(0, 9).map((tourDate, index) => {
                            return <TourDate key={`tourDate-${index}`} name={tourDate.name} accountImage={tourDate.accountImage} showCity={tourDate.city} showState={tourDate.stateCode} showVenue={tourDate.venue} showTime={new Date(tourDate.time)} showSalesStart={new Date(tourDate.salesStart)} showUrl={tourDate.url}/>
                        }));

                    }else{
                        setContent(<InfoMessage>No tour dates currently available.</InfoMessage>);
                    };
                }catch(err){
                    if (axios.isCancel(err)) {

                    }else {
                        setContent(<InfoMessage>Tour dates could not be fetched. Please refresh the page.</InfoMessage>);
                        console.log(err);
                    };
                };
                
            }else if(props.type === "homepage"){
                try{
                    let trendingComedians = await axios.get("/comedians/trending", {cancelToken: source.token});
                    new Promise(resolve => {
                        let ticketMasterRequests = [];

                        trendingComedians.data.forEach((comedian, index) => {
                            ticketMasterRequests.push(
                                new Promise(resolve => {
                                    setTimeout(() => {
                                        resolve(axios.get(`/shows?apiUrl=${encodeURIComponent(`https://app.ticketmaster.com/discovery/v2/events.json?size=2&apikey=0pcDw6l1FVRrpWQ6nxhc8KNfFNRjYom3&classificationName=comedy&keyword=${comedian.name.split(" ").join("-")}&sort=distance,asc&geoPoint=${userGeohash}`)}`));
                                    }, 400 * index);
                                })
                            );
                        });

                        Promise.all(ticketMasterRequests).then(requests => {
                            resolve(requests);
                        }).catch(err => {
                            setContent(<InfoMessage>Tour dates could not be fetched. Please try again.</InfoMessage>);
                            console.log(err);
                        });
                    
                    }).then(results => {
                        Promise.all(results).then(results => {
                            let tourDates = [];
                            results.forEach((show, index) => {
                                let hasEvents = show.data._embedded;

                                if(hasEvents){
                                    hasEvents.events.forEach(date => {
                                        tourDates.push({
                                            name: trendingComedians.data[index].name,
                                            accountImage: trendingComedians.data[index].accountImage,
                                            venue: date._embedded.venues[0].name || undefined,
                                            city: date._embedded.venues[0].city.name,
                                            stateCode: date._embedded.venues[0].state ? date._embedded.venues[0].state.stateCode : date._embedded.venues[0].country.countryCode,
                                            time: date.dates.start.dateTime,
                                            salesStart: date.sales.public.startDateTime,
                                            url: date.url
                                        });
                                    });
                                };
                            });

                            tourDates.sort((a, b) => {
                                return new Date(a.time) - new Date(b.time)
                            });

                            setContent(tourDates.map((tourDate,index) => {
                                return <TourDate key={`tourDate-${index}`} name={tourDate.name} accountImage={tourDate.accountImage} showCity={tourDate.city} showState={tourDate.stateCode} showVenue={tourDate.venue} showTime={new Date(tourDate.time)} showSalesStart={new Date(tourDate.salesStart)} showUrl={tourDate.url}/>
                            }));

                            props.onLoad();
                        });
                    });
                }catch(err){
                    if (axios.isCancel(err)) {

                    }else {
                        setContent(<InfoMessage>Tour dates could not be fetched. Please refresh the page.</InfoMessage>);
                        console.log(err);
                    };
                };
            };
        });

        return () => {
            source.cancel()
        }
    }, [props.accountImage, props.name, props.type]);

    return (
        <Fragment>
            {content}
        </Fragment>
    )
};

export default withErrorHandler(TourFeed);