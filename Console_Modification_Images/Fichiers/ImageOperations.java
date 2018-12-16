/*
 * According to: Travaux Pratiques dans le cous INF2010 coordonnés par Tarek OULD-BACHIR
 *
 * @authors Tarek Ould Bachir, Wail Khemir
 * @created: 2015-09-06
 */

public interface ImageOperations 
{
	public void negate();
	public void convertToBWImage();
	public void convertToGrayImage();
	public void convertToColorImage();
	public void resize(int x, int y);
	public void insert(PixelMap pm, int row0, int col0);
	public void crop(int h, int w);
	public void translate(int colOffset, int rowOffset);
}
