# Always prefer setuptools over distutils
from setuptools import setup

setup (
    name='ckeditor-mediaboxconvert',
    version='0.0.1',
    description='ckeditor-mediaboxconvert',
    author='Michael Wuergler',
    author_email='senjudev@gmail.com',
    url='https://github.com/radiovisual/ckeditor-mediaboxconvert',
    long_description='Easily convert your images and iframe-insulator embeds into Mediabox widgets.',
    license='MIT',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: POSIX',
        'Programming Language :: JavaScript',
        'Topic :: Software Development :: Libraries',
    ],
    zip_safe=False
)