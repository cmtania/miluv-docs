/**
 * iPhone 17 Pro in a titanium frame, with drawn app screens inside. `screens`:
 * [[key, node, alt], …]; they're stacked and cross-fade as `active` changes. The screens
 * are sized in points (390 pt wide) through a container unit, so they stay crisp at any size.
 */
export function IPhone({ screens, active = 0, className = '', style }) {
  return (
    <div className={`device iphone ${className}`} style={style}>
      <div className="device-glass">
        <div className="screen-draw">
          {screens.map(([key, node, alt], i) => (
            <div
              key={key}
              className={`app-screen ${i === active ? 'on' : ''}`}
              role="img"
              aria-label={alt}
              aria-hidden={i === active ? undefined : true}
            >
              {node}
            </div>
          ))}
          <span className="island" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
