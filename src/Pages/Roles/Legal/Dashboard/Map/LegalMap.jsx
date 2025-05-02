import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./LegalMap.css";

export function LegalMap({ jsonData }) {
  const mapRef = useRef();
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    data: null,
  });

  useEffect(() => {
    const width = 660;
    const height = 600;

    d3.select(mapRef.current).select("svg").remove();

    const svg = d3
      .select(mapRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const color = d3
      .scaleThreshold()
      .domain([1, 5, 10, 20, 50, 100, 250, 500, 1000])
      .range([
        "#e3f2fd", // 1–4
        "#bbdefb", // 5–9
        "#90caf9", // 10–19
        "#64b5f6", // 20–49
        "#42a5f5", // 50–99
        "#2196f3", // 100–249
        "#1e88e5", // 250–499
        "#1565c0", // 500–999
        "#0d47a1", // 1000+
      ]);

    d3.json(
      "https://raw.githubusercontent.com/adarshbiradar/maps-geojson/refs/heads/master/india.json"
    )
      .then((india) => {
        if (!india?.features) throw new Error("Invalid GeoJSON format");

        let sampleData = [];
        try {
          sampleData = JSON.parse(jsonData || "[]");
        } catch (e) {
          console.error("Invalid JSON:", e);
          return;
        }

        const dataMap = {};
        sampleData.forEach((d) => {
          dataMap[d.state] = {
            pendingCount: d.pendingCount || 0,
            disposedCount: d.disposedCount || 0,
          };
        });

        india.features.forEach((d) => {
          const stateData = dataMap[d.properties.st_nm] || {
            pendingCount: 0,
            disposedCount: 0,
          };
          d.properties.pendingCount = stateData.pendingCount;
          d.properties.disposedCount = stateData.disposedCount;
        });

        const projection = d3
          .geoMercator()
          .scale(1000)
          .center([78.9629, 22.5937])
          .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        svg
          .selectAll(".state")
          .data(india.features)
          .enter()
          .append("path")
          .attr("class", "state")
          .attr("d", path)
          .attr("fill", (d) => color(d.properties.pendingCount))
          .attr("stroke", "#aaa")
          .attr("stroke-width", 0.5)
          .on("mouseover", function (event, d) {
            d3.select(this).attr("opacity", 0.8);
            setTooltip({
              visible: true,
              x: event.clientX,
              y: event.clientY,
              data: {
                name: d.properties.st_nm,
                pendingCount: d.properties.pendingCount,
                disposedCount: d.properties.disposedCount,
              },
            });
          })
          .on("mousemove", function (event) {
            setTooltip((t) => ({
              ...t,
              x: event.clientX,
              y: event.clientY,
            }));
          })
          .on("mouseout", function () {
            d3.select(this).attr("opacity", 1);
            setTooltip({ visible: false, x: 0, y: 0, data: null });
          });
      })
      .catch((error) => {
        console.error("GeoJSON Load Error:", error);
      });
  }, [jsonData]);

  return (
    <div className="map-container" ref={mapRef}>
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
        >
          <strong>{tooltip.data.name}</strong>
          <br />
          <span className="label pending">Pending:</span>{" "}
          <span>{tooltip.data.pendingCount}</span>
          <br />
          <span className="label disposed">Disposed:</span>{" "}
          <span>{tooltip.data.disposedCount}</span>
        </div>
      )}
    </div>
  );
}
