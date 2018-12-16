
/*
 * According to: Travaux Pratiques dans le cous INF2010 coordonnés par Tarek OULD-BACHIR
 *
 * @authors Tarek Ould Bachir, Wail Khemir
 * @created: 2015-09-06
 */


public abstract class AbstractPixel 
{
	public abstract BWPixel toBWPixel();
	public abstract GrayPixel toGrayPixel();
	public abstract ColorPixel toColorPixel();
	public abstract TransparentPixel toTransparentPixel();
	
	public abstract AbstractPixel Negative();
	public abstract void setAlpha(int alpha);
	
	public abstract String toString();
}
